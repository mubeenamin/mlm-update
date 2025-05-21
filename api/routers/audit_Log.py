
import datetime
from typing import List
from fastapi import APIRouter, HTTPException, Response, status
from sqlmodel import select
from api.models import AuditLog, User
from api.dep import db_dependency


router = APIRouter(
    prefix="/api/routers/audit_log",
    tags=["AuditLog"]
    
)
# def log_action(db: db_dependency, user: User, action: str):
#     audit_log = AuditLog(
#         user_id=user.id,
#         user_name=f"{user.firstName} {user.lastName}",
#         user_email=user.email,
#         action_description=action
#     )
#     db.add(audit_log)
#     db.commit()
#     db.refresh(audit_log)
#     return audit_log
def log_action(db: db_dependency, user: User, user_id: int, date: str, action: str, amount: float, status: str):
    audit_log = AuditLog(
        user_id=user_id,  # Maps to 'User ID'
        user_name=f"{user.firstName} {user.lastName}",  # Maps to 'Name'
        date=date,   # Maps to 'Date'
        amount=amount,                                 # Maps to 'Amount'
        status=status,                                 # Maps to 'Status'
        action_description=action                     # Maps to 'Action'
    )
    db.add(audit_log)
    db.commit()
    db.refresh(audit_log)
    return audit_log

@router.get("/logs", response_model=List[AuditLog])
async def get_audit_logs(db: db_dependency):
    logs = db.exec(select(AuditLog)).all()
    return logs