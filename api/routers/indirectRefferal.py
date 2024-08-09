from fastapi import APIRouter, status
from sqlmodel import select
from api.models import InDirectRefferal, InDirectRefferalCreate
from api.dep import db_dependency, user_dependency


router = APIRouter(
    prefix="/api/routers/indirectRefferal",
    tags=["indirectRefferal"]
)

@router.get("/get_all", response_model=list[InDirectRefferal])
async def get_withdrawals(db: db_dependency, user: user_dependency):
    return db.exec(select(InDirectRefferal)).all()


@router.get("/get_indirectRefferal_by_user_id/{user_id}", response_model=list[InDirectRefferal])
async def get_withdrawal_by_user_id(db: db_dependency, user: user_dependency, user_id: int):
    return db.exec(select(InDirectRefferal).where(InDirectRefferal.user_id == user_id)).all()


@router.get("/get_indirectRefferal_by_id/{indirectRefferal_id}", response_model=InDirectRefferal)
async def get_withdrawal_by_id(db: db_dependency, user: user_dependency, indirectRefferal_id: int):
    return db.exec(select(InDirectRefferal).where(InDirectRefferal.id == indirectRefferal_id)).first()

@router.post("/create_indirectRefferal", response_model=InDirectRefferal, status_code=status.HTTP_201_CREATED)
async def create_indirectRefferal(db: db_dependency, user: user_dependency, indirectRefferal: InDirectRefferal):
    
    db.add(indirectRefferal)
    db.commit()
    db.refresh(indirectRefferal)
    return indirectRefferal


@router.delete("/delete_indirectRefferal_by_id/{indirectRefferal_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_indirectRefferal_by_id(db: db_dependency, user: user_dependency, indirectRefferal_id: int):
    result = db.exec(select(InDirectRefferal).where(InDirectRefferal.id == indirectRefferal_id)).first()
    db.delete(result)
    db.commit()
    return result