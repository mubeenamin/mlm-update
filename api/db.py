from dotenv import load_dotenv , find_dotenv
import os
from sqlmodel import create_engine , SQLModel ,Session




_: bool = load_dotenv(find_dotenv()) 

key = os.environ.get('DB_url')

if key is None:
    raise ValueError('Database key not found')


engine = create_engine(key)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_db():
    with Session(engine) as session:
        yield session