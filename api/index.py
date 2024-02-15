from fastapi import FastAPI
from .db import create_db_and_tables

app = FastAPI()


@app.on_event("startup")
def on_startup():
    create_db_and_tables()


@app.get("/api/python")
def get_python():
    return {"message": "Hello World"}
