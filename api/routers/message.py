from fastapi import APIRouter, status
from sqlmodel import select
from api.models import Message,  User
from api.dep import db_dependency

router = APIRouter(
    prefix="/api/routers/message",
    tags=["Messages"]
)
def get_admin_user(db: db_dependency,):
    return db.exec(select(User).where(User.name == 'admin')).first()


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

@router.post("/send_message_by_user")
def send_message_by_admin(db: db_dependency, message: Message):
    reciever_id = db.exec(select(User).where(User.name == 'admin')).first().id
    message_data = message.model_dump()
    message_data['recipient_id'] = reciever_id
    message_data = Message.model_validate(message_data)
    db.add(message_data)
    db.commit()
    db.refresh(message_data)
    return message_data

@router.delete("/delete_message_by_id/{message_id}")
async def delete_message_by_id(db: db_dependency,  message_id: int):
    result = db.exec(select(Message).where(Message.id == message_id)).first()
    db.delete(result)
    db.commit()
    
    return {"message": "Message deleted" , "result" : result}