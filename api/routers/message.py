from fastapi import APIRouter, status
from sqlmodel import select
from api.models import Message, CreateMessage, User
from api.dep import db_dependency

router = APIRouter(
    prefix="/api/routers/message",
    tags=["Messages"]
)

@router.post("/send_message")
def send_message(db: db_dependency, message: Message):
    db.add(message)
    db.commit()
    db.refresh(message)
    return message

@router.get("/get_messages/{user_id}")
def get_messages(db: db_dependency, user_id: int):
    return db.exec(select(Message).where(Message.recipient_id == user_id)).all()

@router.get("/get_by_id/{message_id}")
def get_by_id(db: db_dependency, message_id: int):
    return db.exec(select(Message).where(Message.id == message_id)).first()

@router.post("/send_message_by_admin")
def send_message_by_admin(db: db_dependency, message: Message):
    db.add(message)
    db.commit()
    db.refresh(message)
    return message