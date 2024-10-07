from fastapi import APIRouter, status
from sqlmodel import select
from api.models import Balance, Fund,  User
from api.dep import db_dependency

router = APIRouter(
    prefix="/api/routers/fund",
    tags=["Funds"]
)

@router.get("/get_funds")
async def get_funds(db: db_dependency):
    return db.exec(select(Fund)).all()

@router.get("/get_fund_by_user_id/{user_id}")
async def get_fund_by_user_id(db: db_dependency, user_id: int):
    return db.exec(select(Fund).where(Fund.user_id == user_id)).all()

@router.post("/create_fund")
async def create_fund(db: db_dependency, fund: Fund):
    receiver_id = db.exec(select(User).where(User.email == fund.email)).first().id
    db.add(fund)
    db.commit()
    db.refresh(fund)
    
    current_balance = db.exec(select(Balance).where(Balance.user_id == receiver_id)).first()
    current_balance.balance += fund.amount
    db.add(current_balance)
    db.commit()
    db.refresh(current_balance)
    
    return fund