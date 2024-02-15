from sqlmodel import Field, SQLModel, Relationship
from model import user

# Country models start here -------------- ⬇️
class country(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    created_at: str
    updated_at: str