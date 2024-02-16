from sqlmodel import Field, SQLModel, Relationship
from typing import Optional
# Country models start here -------------- ⬇️
class package(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    created_at: str
    updated_at: str