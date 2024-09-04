from fastapi import APIRouter, status
from sqlmodel import select
from sqlalchemy import func
from api.models import Balance, BalanceUpdate, TotalBalance
from api.dep import db_dependency, user_dependency

router = APIRouter(
    prefix="/api/routers/balance",
    tags=["Balance"]
)


@router.get("/")
async def get_balance(db: db_dependency ):
    return db.exec(select(Balance)).all()

@router.post ("/create_balance", status_code=status.HTTP_201_CREATED)
async def create_balance(db: db_dependency, balance: Balance):
    db.add(balance)
    db.commit()
    db.refresh(balance)
    return balance

@router.put ("/update_balance_by_id/{user_id}")
async def update_balance_by_id(db: db_dependency, user_id: int, balance: BalanceUpdate):
    result = db.exec(select(Balance).where(Balance.user_id == user_id)).first()
    result.balance = balance.balance
    db.add(result)
    db.commit()
    db.refresh(result)
    return result

@router.get("/calculate_balances")
async def calculate_balances(db: db_dependency):
    # Calculate the sum of balances using SQLAlchemy's `func.sum()`
    query = select(func.sum(Balance.balance))
    all_balance = db.exec(query).fetchall()
    # You can return the total balance as a JSON response
    return {"total_balance": all_balance[0]}