from datetime import timedelta, datetime, timezone
from typing import Annotated, List
from fastapi import APIRouter, Depends, HTTPException, status 
from fastapi.security import OAuth2PasswordRequestForm
from jose import jwt
from dotenv import load_dotenv
from sqlmodel import select
from api.models import User, Token
from api.dep import bcrypt_context, db_dependency



load_dotenv()


router = APIRouter(
    prefix="/api/routers/auth",
    tags=["auth"]
)

SECRET_KEY = 'jnnxycv32'
ALGORITHM = 'HS256'


    
def authenticate_user(username: str, password: str, db: db_dependency):
    user = db.exec(select(User).where(User.email == username)).first()
    if not user:
        return False
    if not bcrypt_context.verify(password, user.password):
        return False
    return user


def create_access_token(username: str, user_id: int, expires_delta: timedelta | None = None):
    encode = {'sub': username, 'id': user_id}
    expires = datetime.now(timezone.utc) + expires_delta
    encode.update({'exp': expires})
    return jwt.encode(encode, SECRET_KEY, algorithm=ALGORITHM)










@router.post('/token', response_model=Token)
async def login_for_access_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db:db_dependency):
    user = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate user")
    token = create_access_token(user.email, user.id, timedelta(minutes=20))
    
    return {'access_token': token, 'token_type': 'bearer'}