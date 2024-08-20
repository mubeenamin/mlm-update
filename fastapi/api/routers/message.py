from fastapi import APIRouter, status
from sqlmodel import select
from api.models import message
from api.dep import db_dependency

router = APIRouter(
    prefix="/fastapi/api/routers/message",
    tags=["Message"]
)


@router.get("/get_all", response_model=list[message])
async def get_messages(db: db_dependency):
    return db.exec(select(message)).all()


@router.get("/get_all_by_user_id/{user_id}", response_model=list[message])
async def get_messages_by_user_id(db: db_dependency, user_id: int):
    return db.exec(select(message).where(message.user_id == user_id)).all()


@router.get("/get_by_id/{message_id}", response_model=message)
async def get_messages_by_id(db: db_dependency, message_id: int):
    return db.exec(select(message).where(message.id == message_id)).first() 


@router.post("/create_message", status_code=status.HTTP_201_CREATED)
async def create_message(db: db_dependency, message: message):
    db.add(message)
    db.commit()
    db.refresh(message)
    return message

