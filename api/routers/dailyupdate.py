from fastapi import APIRouter, status
from sqlmodel import select
from sqlalchemy import func, update
from api.models import Balance, BalanceUpdate, TotalBalance, User
from api.dep import db_dependency

router = APIRouter(
    prefix="/api/routers/dailyupdate",
    tags=["dailyupdate"]
)

@router.get("/calculate_earnings")
async def main(db: db_dependency):
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
    return {"message": "Earnings calculated and updated successfully."}

def calculate_earnings(user):
    if user.Balances is None:
        print(f"User {user.id} has no balance record.")
        return 0  # or handle this case as needed

    daily_profit_pkg = 0
    if user.Balances.package == "Bronze":
        daily_profit_pkg = 1
    elif user.Balances.package == "Silver":
        daily_profit_pkg = 2
    elif user.Balances.package == "Gold":
        daily_profit_pkg = 4
    elif user.Balances.package == "Gold Plus":
        daily_profit_pkg = 8
    elif user.Balances.package == "Diamond":
        daily_profit_pkg = 16
    elif user.Balances.package == "Diamond Plus":
        daily_profit_pkg = 32
    elif user.Balances.package == "Platinum":
        daily_profit_pkg = 64
    elif user.Balances.package == "Platinum Plus":
        daily_profit_pkg = 128
        
    return daily_profit_pkg

def update_balance(user_id, new_balance, db: db_dependency):
    statement = (update(Balance).where(Balance.user_id == user_id).values(balance = new_balance))
    db.exec(statement)
    db.commit()
