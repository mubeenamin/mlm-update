from fastapi import APIRouter, status
from sqlmodel import select
from api.models import Balance, BalanceUpdate
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
