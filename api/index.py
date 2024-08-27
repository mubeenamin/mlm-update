from fastapi import FastAPI
from sqlmodel import Session, select, update
from api.db import  engine
from api.models import *
from fastapi.middleware.cors import CORSMiddleware
from apscheduler.schedulers.background import BackgroundScheduler
from api.routers import auth, withdrawal, pin, referral_type, balance, user , notification 
import math

def calculate_earnings(user):
    if user.Balances is None:
        print(f"User {user.id} has no balance record.")
        return 0  # or handle this case as needed
    user_balance = round(user.Balances.balance)
    daily_profit_pkg = 0
    if user.Balances.package == "Bronze":
        daily_profit_pkg = 1
    elif user.Balances.package == "Silver":
        daily_profit_pkg = 2
    elif user.Balances.package == "Gold":
        daily_profit_pkg = 4
    elif user.Balances.package == "Gold Plus":
        daily_profit_pkg = 8
    elif user.Balances.package == "Daimond":
        daily_profit_pkg = 16
    elif user.Balances.package == "Daimond Plus":
        daily_profit_pkg = 32
    elif user.Balances.package == "Platinum":
        daily_profit_pkg = 64
    elif user.Balances.package == "Platinum Plus":
        daily_profit_pkg = 128
    direct_referrals = [ref for ref in user.referrals if ref.referral_type_id == 1]
    indirect_referrals = [ref for ref in user.referrals if ref.referral_type_id == 2]

    percent_profit = 0
    if 1 <= len(direct_referrals) <= 24:
        percent_profit = 0.1
    elif 25 <= len(direct_referrals) <= 119:
        percent_profit = 0.2
    elif 120 <= len(direct_referrals) <= 299:
        percent_profit = 0.3
    elif 300 <= len(direct_referrals) <= 699:
        percent_profit = 0.4
    elif len(direct_referrals) >= 700:
        percent_profit = 0.5

    direct_referrals_profit = user_balance * len(direct_referrals) * percent_profit
    indirect_referrals_profit = user_balance * len(indirect_referrals) * 0.03

    total_referral_profit = round(direct_referrals_profit + indirect_referrals_profit)
    total_earnings = round(daily_profit_pkg + total_referral_profit)

    return total_earnings

def update_balance(user_id, new_balance, db: Session):
    statement = (update(Balance).where(Balance.user_id == user_id).values(balance = new_balance))
    db.exec(statement)
    db.commit()
def main(db: Session):
    users = db.exec(select(User)).all()

    for user in users:
        print(f"Processing user {user.id}")
        total_earnings = calculate_earnings(user)
        if user.Balances is not None:
            new_balance = user.Balances.balance + total_earnings
            print(f"Updating balance for user {user.id} to {new_balance}")
            update_balance(user.id, new_balance, db)
        else:
            print(f"User {user.id} has no balance record, skipping update.")

def start_scheduler():
    scheduler = BackgroundScheduler()
    scheduler.add_job(run_main, 'interval', seconds=86400)
    scheduler.start()

def run_main():
    try:
        with Session(engine) as session:
            main(session)
    except Exception as e:
        print(f"An error occurred: {e}")

app = FastAPI()
SQLModel.metadata.create_all(bind=engine)
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
    start_scheduler()

@app.get("/api/hello")
def hello_world():
    return {"message": "Hello World"}

app.include_router(user.router)
app.include_router(auth.router)
app.include_router(withdrawal.router)
app.include_router(pin.router)
app.include_router(referral_type.router)
app.include_router(balance.router)
app.include_router(notification.router)

