from fastapi import APIRouter, HTTPException, status
from sqlmodel import select
from api.models import ReferralType, Referral
from api.dep import db_dependency, user_dependency, bcrypt_context
from typing import Annotated, List
from api.models import User, UserCreate, UserRead, Referral, ReferralType


router = APIRouter(
    prefix="/api/routers/user",
    tags=["User"]
)



@router.post("/", status_code=status.HTTP_201_CREATED)
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
    if user.referral_type_name == "Direct":
        # Get all uplines of the referrer
        uplines = db.exec(select(Referral).where(Referral.referred_user_id == user.referrer_user_id)).all()
        indirect_referral_type = db.exec(select(ReferralType).where(ReferralType.referral_type_name == "Indirect")).first()
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



@router.get("/me", response_model=List[UserRead])
async def get_users(db: db_dependency):
    statement  = select(User)
    users = db.exec(statement).all()
    return users



# get single user 

@router.get("/{user_id}", response_model=UserRead)
async def get_user(user_id: int, db: db_dependency):
    return db.exec(select(User).where(User.id == user_id)).first()

