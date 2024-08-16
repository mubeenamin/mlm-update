from fastapi import APIRouter, HTTPException, status
from sqlmodel import select
from api.models import ReferralType, Referral
from api.dep import db_dependency, user_dependency
from typing import List
router = APIRouter(
    prefix="/fastapi/api/routers/referral_type",
    tags=["Referral Type"]
)

@router.get("/get_all", response_model=Referral)
def get_referral_type(user_id: int, referrer_user_id: int, db:db_dependency):
    # Check if the user is a direct referral
    direct_referral = db.exec(
        select(Referral).where(
            Referral.referrer_user_id == referrer_user_id,
            Referral.referred_user_id == user_id,
            Referral.referral_type_id == 1  # Assuming 1 is the ID for 'Direct'
        )
    ).first()

    if direct_referral:
        return {"referral_type": "Direct"}

    # Check if the user is an indirect referral
    indirect_referral = db.exec(
        select(Referral).where(
            Referral.referred_user_id == user_id,
            Referral.referral_type_id == 2  # Assuming 2 is the ID for 'Indirect'
        )
    ).first()

    if indirect_referral:
        return {"referral_type": "Indirect"}

    raise HTTPException(status_code=404, detail="Referral not found")


@router.post("/create_referral_type", status_code=status.HTTP_201_CREATED)
async def create_referral_type(referral_type: ReferralType, db: db_dependency):
    db.add(referral_type)
    db.commit()
    db.refresh(referral_type)
    return referral_type