from fastapi import APIRouter, status
from sqlmodel import select
from api.models import DirectRefferal, DirectRefferalCreate
from api.dep import db_dependency, user_dependency, get_current_user


router = APIRouter(
    prefix="/api/routers/directRefferal",
    tags=["directRefferal"]
)

@router.get("/get_all", response_model=list[DirectRefferal])
async def get_withdrawals(db: db_dependency,user: user_dependency):
    return db.exec(select(DirectRefferal)).all()

@router.get("/get_directRefferal_by_user_id/{user_id}", response_model=list[DirectRefferal])
async def get_withdrawal_by_user_id(db: db_dependency, user: user_dependency, user_id: int):
    return db.exec(select(DirectRefferal).where(DirectRefferal.user_id == user_id)).all()


@router.get("/get_directRefferal_by_id/{directRefferal_id}", response_model=DirectRefferal)
async def get_withdrawal_by_id(db: db_dependency, user: user_dependency, directRefferal_id: int):
    return db.exec(select(DirectRefferal).where(DirectRefferal.id == directRefferal_id)).first()

@router.post("/create_directRefferal", status_code=status.HTTP_201_CREATED)
async def create_directRefferal(db: db_dependency,  user: user_dependency, directRefferal: DirectRefferal ):
    
    db.add(directRefferal)
    db.commit()
    db.refresh(directRefferal)
    return directRefferal


@router.delete("/delete_directRefferal_by_id/{directRefferal_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_directRefferal_by_id(db: db_dependency, user: user_dependency, directRefferal_id: int):
    result = db.exec(select(DirectRefferal).where(DirectRefferal.id == directRefferal_id)).first()
    db.delete(result)
    db.commit()
    return result
