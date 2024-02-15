from sqlmodel import SQLModel, Field, Relationship

# User models start here -------------- ⬇️


class user(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    national_id: str
    email: str
    password: str
    created_at: str
    updated_at: str
    city: str
    phone_num: str
    currency: str
    Date: str
    # country_id: int | None = Field(foreign_key="country.id", default=None)
    # pin: int | None = Field(foreign_key="pin.id", default=None)
    # package: int | None = Field(foreign_key="package.id", default=None)
    # referral: int | None = Field(foreign_key="referral.id", default=None)
    # total_referral: int | None = Field(
    #     foreign_key="total_referral.id", default=None)
    # withdrawal: int | None = Field(foreign_key="withdrawal.id", default=None)


# user create
class userCreate(SQLModel):
    national_id: str
    email: str
    password: str
    created_at: str
    updated_at: str
    city: str
    phone_num: str
    currency: str
    Date: str
