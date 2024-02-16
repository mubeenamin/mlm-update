from sqlmodel import Field, SQLModel
from typing import Optional
# pin models start here -------------- ⬇️


class total_referral(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    pin: str
    created_at: str
    updated_at: str
