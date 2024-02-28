from fastapi import FastAPI, Depends, HTTPException, Query
from typing import Annotated
from sqlmodel import Session, select
from api.db import get_db, create_db_and_tables
from api.models import User, UserCreate, UserRead, UserUpdate, Pin, Referral, Withdrawal, PinRead, ReferralRead, WithdrawalRead, PinCreate, ReferralCreate, WithdrawalCreate, PinUpdate, ReferralUpdate, WithdrawalUpdate
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
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
def on_startup():
    create_db_and_tables()

# @app.get("/")
# def read_root():
#     return {"Hello": "World"}


# get all the users

# @app.get("/")
# def read_root():
#     return {"Hello": "World"}

# get all the users
@app.get("/api/users" , response_model=list[User])
def get_users(session : Annotated[Session, Depends(get_db)]):
    users = session.exec(select(User)).all()
    return users

#get user by single id 

@app.get("/api/single_users/{user_id}" , response_model=User)
def get_user_by_id(session : Annotated[Session, Depends(get_db)], user_id : int):
    user = session.get(User , user_id)
    if not user:
        raise HTTPException(status_code=404 , detail="User not found")
    return user

# create a new user


@app.post("/api/create_users" , response_model=User)
def create_user(session : Annotated[Session, Depends(get_db)] , user : UserCreate):
    db_user = User.model_validate(user)
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user

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


@app.delete("/delete_users/{user_id}")
def delete_user(session : Annotated[Session, Depends(get_db)] , user_id : int):
    db_user = session.get(User , user_id)
    if not db_user:
        raise HTTPException(status_code=404 , detail="User not found")
    session.delete(db_user)
    session.commit()
    return {"message" : "User deleted"}

# get all the refferals
@app.get("/api/referrals" , response_model=list[Referral])
def get_referrals(session : Annotated[Session, Depends(get_db)], offset : int = Query(default=0 , le= 4), limit : int = Query(default=2 , le=4)):
    referrals = session.exec(select(Referral).offset(offset).limit(limit)).all()
    return referrals

# get referral by single id 

@app.get("/api/single_referrals/{referral_id}" , response_model=ReferralRead)
def get_referral_by_id(session : Annotated[Session, Depends(get_db)], referral_id : int):
    referral = session.get(Referral , referral_id)
    if not referral:
        raise HTTPException(status_code=404 , detail="Referral not found")
    return referral

# create a new referral

@app.post("/api/create_referrals" , response_model=Referral)
def create_referral(session : Annotated[Session, Depends(get_db)] , referral : ReferralCreate):
    db_referral = Referral.model_validate(referral)
    session.add(db_referral)
    session.commit()
    session.refresh(db_referral)
    return db_referral

# update referral


@app.put("/api/update_referrals/{referral_id}")
def update_referral(referral_id : int , referral : ReferralUpdate , session : Annotated[Session, Depends(get_db)]):
    referral_to_update = session.get(Referral , referral_id)
    if not referral_to_update:
        raise HTTPException(status_code=404 , detail="Referral not found")
    referral_to_update.referral_id = referral.referral_id
    session.add(referral_to_update)
    session.commit()
    session.refresh(referral_to_update)
    return referral_to_update
# delete referral
@app.delete("/api/delete_referrals/{referral_id}")
def delete_referral(session : Annotated[Session, Depends(get_db)] , referral_id : int):
    db_referral = session.get(Referral , referral_id)
    if not db_referral:
        raise HTTPException(status_code=404 , detail="Referral not found")
    session.delete(db_referral)
    session.commit()
    return {"message" : "Referral deleted"}

# get all the withdrawals
@app.get("/api/withdrawals" , response_model=list[Withdrawal])
def get_withdrawals(session : Annotated[Session, Depends(get_db)], offset : int = Query(default=0 , le= 4), limit : int = Query(default=2 , le=4)):
    withdrawals = session.exec(select(Withdrawal).offset(offset).limit(limit)).all()
    return withdrawals

# get single withdrawal by id 
@app.get("/api/single_withdrawals/{withdrawal_id}" , response_model=WithdrawalRead)
def get_withdrawal_by_id(session : Annotated[Session, Depends(get_db)], withdrawal_id : int):
    withdrawal = session.get(Withdrawal , withdrawal_id)
    if not withdrawal:
        raise HTTPException(status_code=404 , detail="Withdrawal not found")
    return withdrawal

# create a new withdrawal
@app.post("/api/create_withdrawals" )
def create_withdrawal(session : Annotated[Session, Depends(get_db)] , withdrawal : WithdrawalCreate):
    db_withdrawal = Withdrawal.model_validate(withdrawal)
    session.add(db_withdrawal)
    session.commit()
    session.refresh(db_withdrawal)
    return db_withdrawal

# update withdrawal
@app.put("/api/update_withdraws/{withdraw_id}")
def update_withdraw(withdraw_id : int , withdraw : WithdrawalUpdate , session : Annotated[Session, Depends(get_db)]):
    withdraw_to_update = session.get(Withdrawal , withdraw_id)
    if not withdraw_to_update:
        raise HTTPException(status_code=404 , detail="Withdraw not found")
    withdraw_to_update.withdrawal_amount = withdraw.withdrawal_amount
    session.add(withdraw_to_update)
    session.commit()
    session.refresh(withdraw_to_update)
    return withdraw_to_update
# delete withdrawal
@app.delete("/api/delete_withdrawals/{withdrawal_id}")
def delete_withdrawal(session : Annotated[Session, Depends(get_db)] , withdrawal_id : int):
    db_withdrawal = session.get(Withdrawal , withdrawal_id)
    if not db_withdrawal:
        raise HTTPException(status_code=404 , detail="Withdrawal not found")
    session.delete(db_withdrawal)
    session.commit()
    return {"message" : "Withdrawal deleted"}

# all the pins
@app.get("/api/pins" , response_model=list[Pin])
def get_pins(session : Annotated[Session, Depends(get_db)], offset : int = Query(default=0 , le= 4), limit : int = Query(default=2 , le=4)):
    pins = session.exec(select(Pin).offset(offset).limit(limit)).all()
    return pins

# get single pin by id 


@app.get("/api/single_pins/{pin_id}" , response_model=PinRead)
def get_pin_by_id(session : Annotated[Session, Depends(get_db)], pin_id : int):
    pin = session.get(Pin , pin_id)
    if not pin:
        raise HTTPException(status_code=404 , detail="Pin not found")
    return pin

# create a new pin


@app.post("/api/create_pins" )
def create_pin(session : Annotated[Session, Depends(get_db)] , pin : PinCreate):
    db_pin = Pin.model_validate(pin)
    session.add(db_pin)
    session.commit()
    session.refresh(db_pin)
    return db_pin

# update pin


@app.put("/api/update_pins/{pin_id}")
def update_pin(pin_id : int , pin : PinUpdate , session : Annotated[Session, Depends(get_db)]):
    pin_to_update = session.get(Pin , pin_id)
    if not pin_to_update:
        raise HTTPException(status_code=404 , detail="Pin not found")
    pin_to_update.pin_id = pin.pin_id
    session.add(pin_to_update)
    session.commit()
    session.refresh(pin_to_update)
    return pin_to_update

# delete pin


@app.delete("/api/delete_pins/{pin_id}")
def delete_pin(session : Annotated[Session, Depends(get_db)] , pin_id : int):
    db_pin = session.get(Pin , pin_id)
    if not db_pin:
        raise HTTPException(status_code=404 , detail="Pin not found")
    session.delete(db_pin)
    session.commit()
    return {"message" : "Pin deleted"}