from fastapi import APIRouter, status
from sqlmodel import select
from api.models import Balance
from api.dep import db_dependency, user_dependency

router = APIRouter(
    prefix="/fastapi/api/routers/balance",
    tags=["Balance"]
)


@router.get("/")
async def get_balance(db: db_dependency, ):
    return db.exec(select(Balance)).all()

@router.post ("/create_balance", status_code=status.HTTP_201_CREATED)
async def create_balance(db: db_dependency, balance: Balance):
    db.add(balance)
    db.commit()
    db.refresh(balance)
    return balance

