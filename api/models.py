from datetime import datetime
from sqlmodel import Field, SQLModel, Relationship
from typing import Optional
from decimal import Decimal




class ReferralBase(SQLModel):
    referral_code : str 
    # user_id : Optional[int] = Field(default = None , foreign_key = "user.id")

    

class Referral(ReferralBase , table = True):
    id : Optional[int] = Field(default = None , primary_key = True)
    user : Optional["User"] = Relationship(back_populates = "referral")
    

class ReferralCreate(ReferralBase):
    pass

class ReferralRead(ReferralBase):
    id : int

class ReferralUpdate(ReferralBase):
    referral_id : Optional[str]


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


class pinBase(SQLModel):
    pin_id : str 
    user_id : Optional[int] = Field(default = None , foreign_key = "user.id")
    


class Pin(pinBase , table = True):
    id : Optional[int] = Field(default = None , primary_key = True)
    user : Optional["User"] = Relationship(back_populates = "pin")

class PinCreate(pinBase):
    pass

class PinRead(pinBase):
    id : int

class PinUpdate(pinBase):
    pin_id : str

class daily_profitBase(SQLModel):
    daily_profit : Decimal = Field(default = 0.00)
    value_to_update : Decimal = Field(default = 0.00)
    last_updated : datetime = Field(default = datetime.now())
    
    user_id : Optional[int] = Field(default = None , foreign_key = "user.id")

class Daily_profit(daily_profitBase , table = True):
    id : Optional[int] = Field(default = None , primary_key = True)
    user : Optional["User"] = Relationship(back_populates = "daily_profit")

class Daily_profitRead(daily_profitBase):
    id : int

class Daily_profitCreate(daily_profitBase):
    pass

class Daily_profitUpdate(daily_profitBase):
    daily_profit : str


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
    referral_id : Optional[int] = Field(default = None , foreign_key = "referral.id") 

    
class User(userBase , table = True):
    id : Optional[int] = Field(default = None , primary_key = True)
    withdrawal : Optional[Withdrawal] = Relationship(back_populates = "user")
    pin : Optional[Pin] = Relationship(back_populates = "user")
    referral : Optional[Referral] = Relationship(back_populates = "user")
    daily_profit : Optional[Daily_profit] = Relationship(back_populates = "user")


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
    balance : Optional[Decimal]
    

class UserWithAll(UserRead):
    withdrawal : WithdrawalRead
    pin : PinRead
    referral : ReferralRead
    
    

