from dotenv import load_dotenv , find_dotenv
import os
from sqlmodel import create_engine




_: bool = load_dotenv(find_dotenv()) 

key = os.environ.get('DB_URL')

if key is None:
    raise ValueError('Database key not found')


engine = create_engine(
    key,
    pool_pre_ping=True,
    pool_recycle=1  # Recycle connections every hour (adjust as needed)
)
