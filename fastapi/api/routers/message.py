from fastapi import APIRouter, status
from sqlmodel import select
from api.models import message
from api.dep import db_dependency

router = APIRouter(
    prefix="/fastapi/api/routers/message",
    tags=["Message"]
)


@router.post("/create_message", status_code=status.HTTP_201_CREATED)
async def create_message(db: db_dependency, message: message):
    db.add(message)
    db.commit()
    db.refresh(message)
    return message


@router.get("/messages", response_model=list[message])
async def get_messages(db: db_dependency):
    return db.exec(select(message)).all()


@router.get("/message_by_id/{message_id}", response_model=message)
async def get_message_by_id(db: db_dependency, message_id: int):
    return db.exec(select(message).where(message.id == message_id)).first()

@router.delete("/delete_message_by_id/{message_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_message_by_id(db: db_dependency, message_id: int):
    result = db.exec(select(message).where(message.id == message_id)).first()
    db.delete(result)
    db.commit()
    return {"message": "Message deleted" , "result" : result}