from sqlmodel import Field, SQLModel, Relationship

# Country models start here -------------- ⬇️
class package(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    created_at: str
    updated_at: str