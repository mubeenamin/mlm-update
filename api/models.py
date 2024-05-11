from datetime import datetime
from sqlmodel import Field, SQLModel, Relationship
from typing import Optional
from decimal import Decimal


class withdrawalBase(SQLModel):
    withdrawal_amount : str 
    status : str
    user_id : Optional[int] = Field(default = None , foreign_key = "user.id")
    
    
class Withdrawal(withdrawalBase , table = True):
    id : Optional[int] = Field(default = None , primary_key = True)
    user : Optional["User"] = Relationship(back_populates = "withdrawal")

class WithdrawalCreate(withdrawalBase):
    pass

class WithdrawalRead(withdrawalBase):
    id : int

class WithdrawalUpdate(withdrawalBase):
    withdrawal_amount : Optional[str]




class userBase(SQLModel):
    nation_id : str
    email : str 
    password : str
    phone : str
    currency : str
    country : str
    city : str
    package : str
    role : str
    created_at: str
    updated_at: str
    balance : Decimal = Field(default = 0.00)
    referral_profit: Decimal = Field(default = 0.00)
    referral_id : str 
    pin : str

    
class User(userBase , table = True):
    id : Optional[int] = Field(default = None , primary_key = True)
    withdrawal : Optional[Withdrawal] = Relationship(back_populates = "user")
    
    


class UserCreate(userBase):
    pass

class UserRead(userBase):
    id : int

class UserUpdate(userBase):
    nation_id : Optional[str]
    email : Optional[str]
    password : Optional[str]
    phone : Optional[str]
    currency : Optional[str]
    country : Optional[str]
    city : Optional[str]
    package : Optional[str]
    role : Optional[str]
    created_at: Optional[str]
    updated_at: Optional[str]
    balance : Optional[Decimal]
    

class UserWithAll(UserRead):
    withdrawal : WithdrawalRead

    
    

