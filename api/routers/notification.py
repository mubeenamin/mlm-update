from fastapi import APIRouter, status
from sqlmodel import select
from api.models import notification
from api.dep import db_dependency, user_dependency

router = APIRouter(
    prefix="/api/routers/notification",
    tags=["Notification"]
)



@router.get("/notifications", response_model=list[notification])
async def get_notifications(db: db_dependency):
    return db.exec(select(notification)).all()


@router.post("/create_notification", status_code=status.HTTP_201_CREATED)
async def create_notification(db: db_dependency, notification: notification):
    db.add(notification)
    db.commit()
    db.refresh(notification)
    return notification


# delete notification by id
@router.delete("/delete_notification_by_id/{notification_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_notification_by_id(db: db_dependency,  notification_id: int):
    result = db.exec(select(notification).where(notification.id == notification_id)).first()
    db.delete(result)
    db.commit()
    return {"message": "Notification deleted" , "result" : result}


@router.put("/update_notification_by_id/{notification_id}", status_code=status.HTTP_204_NO_CONTENT)
async def update_notification_by_id(db: db_dependency, user: user_dependency, notification_id: int, notification: notification):
    result = db.exec(select(notification).where(notification.id == notification_id)).first()
    result.message = notification.message
    db.add(result)
    db.commit()
    return result


