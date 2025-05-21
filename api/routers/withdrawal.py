
from datetime import datetime
from fastapi import APIRouter, status, HTTPException
from sqlmodel import select
from api.models import Withdrawal, WithdrawalUpdate, User
from api.dep import db_dependency, user_dependency
from api.routers.audit_Log import log_action

router = APIRouter(
    prefix="/api/routers/withdrawal",
    tags=["withdrawal"]
)

@router.get("/get_all", response_model=list[Withdrawal])
async def get_withdrawals(db: db_dependency):
    return db.exec(select(Withdrawal)).all()

# @router.post("/create_withdrawal", status_code=status.HTTP_201_CREATED)
# async def create_withdrawal(db: db_dependency,  withdrawal: Withdrawal):
#     db.add(withdrawal)
#     db.commit()
#     db.refresh(withdrawal)
#     return withdrawal

@router.post("/create_withdrawal", status_code=status.HTTP_201_CREATED)
async def create_withdrawal(db: db_dependency, withdrawal: Withdrawal):
    # Retrieve the user's data
    user = db.exec(select(User).where(User.id == withdrawal.user_id)).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Add withdrawal entry
    db.add(withdrawal)
    db.commit()
    db.refresh(withdrawal)

    # Log the withdrawal action
    log_entry = log_action(
        db=db,
        user_id=user.id, 
        user=user,
        date=datetime.now(),
        action="Withdrawal Request Created", 
        amount=withdrawal.withdrawal_amount, 
        status="Pending",
    )

    return {"withdrawal": withdrawal, "log": log_entry}


@router.get("/get_withdrawal_by_id/{withdrawal_id}", response_model=Withdrawal)
async def get_withdrawal_by_id(db: db_dependency,  withdrawal_id: int):
    return db.exec(select(Withdrawal).where(Withdrawal.id == withdrawal_id)).first()

@router.get("/get_withdrawal_by_user_id/{user_id}", response_model=list[Withdrawal])
async def get_withdrawal_by_user_id(db: db_dependency,  user_id: int):
    return db.exec(select(Withdrawal).where(Withdrawal.user_id == user_id)).all()
@router.put("/update_withdrawal_by_id/{withdrawal_id}", status_code=status.HTTP_204_NO_CONTENT)
async def update_withdrawal_by_id(db: db_dependency,  withdrawal_id: int, withdrawal: WithdrawalUpdate):
    result = db.exec(select(Withdrawal).where(Withdrawal.id == withdrawal_id)).first()
    result.status = withdrawal.status
    db.add(result)
    db.commit()

@router.delete("/delete_withdrawal_by_id/{withdrawal_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_withdrawal_by_id(db: db_dependency,  withdrawal_id: int):
    result = db.exec(select(Withdrawal).where(Withdrawal.id == withdrawal_id)).first()
    db.delete(result)
    db.commit()
    
    