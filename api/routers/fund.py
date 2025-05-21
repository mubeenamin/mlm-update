from fastapi import APIRouter, HTTPException, status
from sqlmodel import select
from api.models import Balance, Fund,  User, FundRead
from api.dep import db_dependency
from api.routers.audit_Log import log_action

router = APIRouter(
    prefix="/api/routers/fund",
    tags=["Funds"]
)

@router.get("/get_funds", response_model=list[FundRead])
async def get_funds(db: db_dependency):
    return db.exec(select(Fund)).all()

@router.get("/get_fund_by_user_id/{user_id}")
async def get_fund_by_user_id(db: db_dependency, user_id: int):
    return db.exec(select(Fund).where(Fund.user_id == user_id)).all()

# @router.post("/create_fund")
# async def create_fund(db: db_dependency, fund: Fund):
#     receiver_id = db.exec(select(User).where(User.email == fund.email)).first().id
#     db.add(fund)
#     db.commit()
#     db.refresh(fund)
    
#     current_balance = db.exec(select(Balance).where(Balance.user_id == receiver_id)).first()
#     current_balance.balance += fund.amount
#     db.add(current_balance)
#     db.commit()
#     db.refresh(current_balance)
    
#     return fund

@router.post("/create_fund")
async def create_fund(db: db_dependency, fund: Fund):
    # Retrieve the receiver's user data
    receiver = db.exec(select(User).where(User.email == fund.email)).first()
    
    if not receiver:
        raise HTTPException(status_code=404, detail="User not found")

    receiver_id = receiver.id

    # Add the new fund entry
    db.add(fund)
    db.commit()
    db.refresh(fund)

    # Update the receiver's balance
    current_balance = db.exec(select(Balance).where(Balance.user_id == receiver_id)).first()
    current_balance.balance += fund.amount
    db.add(current_balance)
    db.commit()
    db.refresh(current_balance)

    # Log the action
    log_entry = log_action(
        db=db, 
        user=receiver,
        user_id =fund.user_id,
        date=fund.date, 
        action="Fund Created", 
        amount=fund.amount,
        status="Success"
    )

    return {"fund": fund, "log": log_entry}
