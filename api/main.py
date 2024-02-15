from fastapi import Depends, FastAPI, HTTPException
from sqlmodel import Session
from db import create_db_and_tables, get_db
from model.user import user, userCreate

app = FastAPI()


@app.on_event("startup")
def on_startup():
    create_db_and_tables()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/users/", response_model=user)
async def create_user(User: userCreate, db: Session = Depends(get_db)):
    user_to_insert = user.model_validate(User)
    db.add(user_to_insert)
    db.commit()
    db.refresh(user_to_insert)
    return user_to_insert


@app.get("/users/", response_model=list[user])
async def get_users(db: Session = Depends(get_db)):
    return db.query(user).all()


@app.put("/users/{user_id}", response_model=user)
async def update_user(user_id: int, update_data: userCreate, db: Session = Depends(get_db)):
    user_to_update = db.query(user).filter(
        user.id == user_id).first()  # type: ignore
    if not user_to_update:
        raise HTTPException(status_code=404, detail="User not found")
    user_data = update_data.model_dump(exclude_unset=True)
    for key, value in user_data.items():
        setattr(user_to_update, key, value)
    db.commit()
    db.refresh(user_to_update)
    return user_to_update


@app.delete("/users/{user_id}")
async def delete_user(user_id: int, db: Session = Depends(get_db)):
    user_to_delete = db.query(user).filter(
        user.id == user_id).first()  # type: ignore
    if not user_to_delete:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(user_to_delete)
    db.commit()
    return {"message": "User deleted"}
