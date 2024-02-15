from sqlmodel import Field, SQLModel

# pin models start here -------------- ⬇️


class withdrawal(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    pin: str
    created_at: str
    updated_at: str
