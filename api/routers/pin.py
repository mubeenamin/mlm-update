
from fastapi import APIRouter, status
from sqlmodel import select
from api.models import Pin, PinUpdate
from api.dep import db_dependency

router = APIRouter(
    prefix="/api/routers/pin",
    tags=["pin"]
)
@router.get("/get_all", response_model=list[Pin])
async def get_pin(db: db_dependency):
    return db.exec(select(Pin)).all()


@router.post("/create_pin", status_code=status.HTTP_201_CREATED)
async def create_pin(db: db_dependency, pin: Pin):
    db.add(pin)
    db.commit()
    db.refresh(pin)
    return pin


@router.put("/update_pin_by_id/{pin_id}", status_code=status.HTTP_204_NO_CONTENT)
async def update_pin_by_id(db: db_dependency, pin_id: int, pin: PinUpdate):
    result = db.exec(select(Pin).where(Pin.id == pin_id)).first()
    result.pin = pin.pin
    db.add(result)
    db.commit()
    return result

@router.delete("/delete_pin_by_id/{pin_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_pin_by_id(db: db_dependency, pin_id: int):
    result = db.exec(select(Pin).where(Pin.id == pin_id)).first()
    db.delete(result)
    db.commit()
    return result