from fastapi import APIRouter, status
from sqlmodel import select
from api.models import Message
from api.dep import db_dependency

router = APIRouter(
    prefix="/api/routers/message",
    tags=["Messages"]
)
