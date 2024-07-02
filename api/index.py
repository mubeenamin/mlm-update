from fastapi import FastAPI, Depends, HTTPException, Query, background
from typing import Annotated
from api.utils import decode_access_token , create_access_token
from fastapi.security import OAuth2PasswordRequestForm , OAuth2PasswordBearer
from datetime import datetime, timedelta

from sqlmodel import Session, case, select, update
from api.db import get_db, create_db_and_tables, engine
from api.models import *
from fastapi.middleware.cors import CORSMiddleware
from apscheduler.schedulers.background import BackgroundScheduler





def update_balance_gold_platinum():
    with Session(engine) as session:
        session.exec(update(User).where(User.package.in_(["Bronze" , "Bronze Plus" , "Gold" , "Gold Plus" , "Platinum" , "Platinum Plus" , "Diamond", "Diamond Plus"])).values(balance = User.balance + case({"Bronze" : 1 , "Bronze Plus" : 2 , "Gold" : 4 , "Gold Plus" : 8 , "Platinum" : 64 , "Platinum Plus" : 128 , "Diamond" : 16 , "Diamond Plus" : 32} , value = User.package)))
        session.commit()
        return {"message" : "Balance Updated"}
        
scheduler = BackgroundScheduler()
scheduler.add_job(update_balance_gold_platinum , 'interval' , minutes = 60)






app = FastAPI()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/login")


origins = [

    "http://localhost",
    "http://localhost:3000",
    "http://127.0.0.1:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def on_startup():
    create_db_and_tables()
    scheduler.start()

session : Annotated[Session, Depends(get_db)]

@app.get("/api/users" , response_model=list[User])
def get_users(session : Annotated[Session, Depends(get_db)]):
    return session.exec(select(User)).all()


#get user by single id 


@app.get("/api/single_users/{id}" , response_model=UserRead)
def get_user_by_id(session : Annotated[Session, Depends(get_db)], id : int):
    user = session.get(User , id)
    if not user:
        raise HTTPException(status_code=404 , detail="User not found")
    return user

# create a new user


@app.post("/api/create_users" , response_model=UserRead)
def create_user(session : Annotated[Session, Depends(get_db)] , user : UserCreate):
    db_user = User.model_validate(user)
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user


# get login user


@app.get("/api/login_users")
def login_user(session: Annotated[Session, Depends(get_db)], email: str, password: str):
    user = session.exec(select(User).where(User.email == email, User.password == password)).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {"user": user}

#create user with jwt


@app.post("/api/create_users_jwt")
def create_user_jwt(session: Annotated[Session, Depends(get_db)], user: UserCreate):
    db_user = User.model_validate(user)
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": db_user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

# get login user with jwt


@app.get("/api/login_users_jwt")
def login_user_jwt(session: Annotated[Session, Depends(get_db)], email: str, password: str):
    user = session.exec(select(User).where(User.email == email, User.password == password)).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/api/login_users" , response_model=UserRead)
def get_login_user(session : Annotated[Session, Depends(get_db)] , email : str , password : str):
    user = session.exec(select(User).where(User.email == email , User.password == password)).first()
    if not user:
        raise HTTPException(status_code=404 , detail="User not found")
    return user



# @app.put("/api/update_balance_gold_platinum")
# def update_balance_gold_platinum():
#     with Session(engine) as session:
#         session.exec(update(User).where(User.package.in_(["Gold" , "Gold Plus" , "Platinum" , "Platinum Plus"])).values(balance = User.balance + case({"Gold" : User.balance*0.01 , "Gold Plus" : 1 , "Platinum" : 2 , "Platinum Plus" : 2} , value = User.package)))
#         session.commit()
#         return {"message" : "Balance Updated"}




# update user


@app.put("/api/update_users/{user_id}")
def update_user(user_id : int , user : UserUpdate , session : Annotated[Session, Depends(get_db)]):
    user_to_update = session.get(User , user_id)
    if not user_to_update:
        raise HTTPException(status_code=404 , detail="User not found")
    user_to_update.nation_id = user.nation_id
    user_to_update.email = user.email

    session.add(user_to_update)
    session.commit()
    session.refresh(user_to_update)
    return user_to_update


# get user by created_at






@app.get("/api/users_by_created_at/{created_at}" , response_model=list[User])
def get_user_by_created_at(session : Annotated[Session, Depends(get_db)], created_at : str):
    users = session.exec(select(User).where(User.created_at == created_at)).all()
    return users

# delete user


@app.delete("/api/delete_users/{user_id}")
def delete_user(session : Annotated[Session, Depends(get_db)] , user_id : int):
    db_user = session.get(User , user_id)
    if not db_user:
        raise HTTPException(status_code=404 , detail="User not found")
    session.delete(db_user)
    session.commit()
    return {"message" : "User deleted"}

# get all the withdrawals
@app.get("/api/withdrawals" , response_model=list[Withdrawal])
def get_withdrawals(session : Annotated[Session, Depends(get_db)]):
    withdrawals = session.exec(select(Withdrawal)).all()
    return withdrawals

# get single withdrawal by id


@app.get("/api/single_withdrawal/{withdrawal_id}" , response_model=Withdrawal)
def get_withdrawal_by_id(session : Annotated[Session, Depends(get_db)] , withdrawal_amount : int):
    withdrawal = session.get(Withdrawal , withdrawal_amount)
    if not withdrawal:
        raise HTTPException(status_code=404 , detail="Withdrawal not found")
    return withdrawal

# create a new withdrawal


@app.post("/api/create_withdrawal" , response_model=Withdrawal)
def create_withdrawal(session : Annotated[Session, Depends(get_db)] , withdrawal : WithdrawalCreate):
    db_withdrawal = Withdrawal.model_validate(withdrawal)
    session.add(db_withdrawal)
    session.commit()
    session.refresh(db_withdrawal)
    return db_withdrawal

# update withdrawal


@app.put("/api/update_withdrawal/{withdrawal_id}")
def update_withdrawal(withdrawal_id : int , withdrawal : WithdrawalUpdate , session : Annotated[Session, Depends(get_db)]):
    withdrawal_to_update = session.get(Withdrawal , withdrawal_id)
    if not withdrawal_to_update:
        raise HTTPException(status_code=404 , detail="Withdrawal not found")
    withdrawal_to_update.withdrawal_amount = withdrawal.withdrawal_amount

    session.add(withdrawal_to_update)
    session.commit()
    session.refresh(withdrawal_to_update)
    return withdrawal_to_update

# delete withdrawal


@app.delete("/api/delete_withdrawal/{withdrawal_id}")
def delete_withdrawal(session : Annotated[Session, Depends(get_db)] , withdrawal_amount : int):
    db_withdrawal = session.get(Withdrawal , withdrawal_amount)
    if not db_withdrawal:
        raise HTTPException(status_code=404 , detail="Withdrawal not found")
    session.delete(db_withdrawal)
    session.commit()
    return {"message" : "Withdrawal deleted"}

