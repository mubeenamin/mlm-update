from fastapi import APIRouter, HTTPException, Response, status
from sqlmodel import select
from api.models import Balance, ReferralType, Referral, UserPasswordUpdate, UserUpdate
from api.dep import db_dependency, bcrypt_context
from typing import Annotated, List
from api.models import User, UserCreate, UserRead, AdminCreate, Referral, ReferralType
from sqlalchemy.orm import joinedload, selectinload


router = APIRouter(
    prefix="/api/routers/user",
    tags=["User"]
)

@router.post("/create_admin", status_code=status.HTTP_201_CREATED)
async def create_admin(db: db_dependency , user: AdminCreate):
    # Hash the password
    hashed_password = bcrypt_context.hash(user.password)
    
    # Create a new user instance with the hashed password
    user_data = user.model_dump()
    user_data['password'] = hashed_password
    user_data['is_admin'] = True
    db_user = User.model_validate(user_data)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    balance = Balance(user_id=db_user.id, balance=user.initial_balance, package=user.userPackage)
    db.add(balance)
    db.commit()
    db.refresh(balance)
    
    return db_user


@router.post("/create", status_code=status.HTTP_201_CREATED)
async def create_user(db: db_dependency , user: UserCreate):
    # Hash the password
    hashed_password = bcrypt_context.hash(user.password)
    
    # Create a new user instance with the hashed password
    user_data = user.model_dump()
    user_data['password'] = hashed_password
    db_user = User.model_validate(user_data)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    balance = Balance(user_id=db_user.id, balance=user.initial_balance, package=user.userPackage)
    db.add(balance)
    db.commit()
    db.refresh(balance)
    
    
    referral_type = db.exec(select(ReferralType).where(ReferralType.referral_type_name == user.referral_type_name)).first()
    if not referral_type:
        raise HTTPException(status_code=404, detail="Referral type not found")

    # Create the referral
    referral = Referral(
        referrer_user_id=user.referrer_user_id,
        referred_user_id=db_user.id,
        referral_type_id=referral_type.referral_type_id
    )
    db.add(referral)
    db.commit()
    db.refresh(referral)
    # Add indirect referrals for all uplines
    if user.referral_type_name == "direct":
        # Get all uplines of the referrer
        uplines = db.exec(select(Referral).where(Referral.referred_user_id == user.referrer_user_id)).all()
        indirect_referral_type = db.exec(select(ReferralType).where(ReferralType.referral_type_name == "indirect")).first()
        for upline in uplines:
            indirect_referral = Referral(
                referrer_user_id=upline.referrer_user_id,
                referred_user_id=db_user.id,
                referral_type_id=indirect_referral_type.referral_type_id
            )
            db.add(indirect_referral)
            db.commit()
            db.refresh(indirect_referral)

    return {"user": db_user, "referral": referral}



@router.get("/login", response_model=UserRead)
async def get_user(email: str, password: str, db: db_dependency):
    statement  = select(User).where(User.email == email)
    user = db.exec(statement).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if not bcrypt_context.verify(password, user.password):
        raise HTTPException(status_code=400, detail="Incorrect password")
    return user


@router.get("/me", response_model=List[UserRead])
async def get_users(db: db_dependency):
    statement  = select(User)
    users = db.exec(statement).all()
    return users

@router.get("/users", response_model=list[UserRead])
def get_all_users(db: db_dependency):
    # Create query with eager loading options
    query = (
        select(User)
        .options(
            # To-one relationships
            joinedload(User.Balances),
            joinedload(User.Pin),
            # To-many relationships
            selectinload(User.Withdrawals),
            selectinload(User.referrals),
            selectinload(User.notifications),
            selectinload(User.fund)
        )
    )
    
    # Execute query
    users = db.exec(query).unique().all()
    
    return users

# get single user 

@router.get("/single_user/{user_id}", response_model=UserRead)
async def get_user(user_id: int, db: db_dependency):
    return db.exec(select(User).where(User.id == user_id)).first()


# delete user


@router.delete("/delete_user/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(db: db_dependency, user_id: int):
    result = db.exec(select(User).where(User.id == user_id)).first()
    db.delete(result)
    db.commit()
    return result

@router.get("/get_users_by_name/{name}", response_model=List[UserRead])
async def get_users_by_name(name: str, db: db_dependency):
    statement  = select(User).where(User.name == name)
    users = db.exec(statement).all()
    return users



@router.put("/update_user_password_by_id/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def update_user_password_by_id(
    db: db_dependency,
    user_id: int,
    user: UserPasswordUpdate
):
    try:
        # Get user from database by user_id
        db_user = db.exec(select(User).where(User.id == user_id)).first()
        if not db_user:
            raise HTTPException(status_code=404, detail="User not found")
        
        # Hash the new password
        hashed_password = bcrypt_context.hash(user.password)
        
        # Update password and save
        db_user.password = hashed_password
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        
        return Response(status_code=status.HTTP_204_NO_CONTENT)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    

@router.get("/users/{user_id}", response_model=UserRead)
def get_user_by_id(user_id: int, db: db_dependency):
    # Create query with eager loading and filtering
    query = (
        select(User)
        .where(User.id == user_id)
        .options(
            joinedload(User.Balances),
            joinedload(User.Pin),
            selectinload(User.Withdrawals),
            selectinload(User.referrals),
            selectinload(User.notifications),
            selectinload(User.fund)
        )
    )
    
    # Execute query
    user = db.exec(query).first()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return user

@router.put("/update_user_by_id/{user_id}")
async def update_withdrawal_by_id(db: db_dependency,  user_id: int, user: UserUpdate):
    result = db.exec(select(User).where(User.id == user_id)).first()
    result.status = user.status
    db.add(result)
    db.commit()
    return {"message": "User updated successfully."} 