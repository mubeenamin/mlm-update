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
def update_balance(user_id, new_balance, db: db_dependency):
    statement = (update(Balance).where(Balance.user_id == user_id).values(balance = new_balance))
    db.exec(statement)
    db.commit()
