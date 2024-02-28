from sqlmodel import Field, SQLModel, Relationship
from typing import Optional 
from datetime import date


class ReferralBase(SQLModel):
    referral_code : str 
    user_id : Optional[int] = Field(default = None , foreign_key = "user.id")

    

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
    pin_id : Optional[str]


class userBase(SQLModel):
    nation_id : str
    email : str = Field(unique = True )
    password : str
    phone : str
    currency : str
    country : str
    city : str
    package : str
    role : str
    
    created_at: date 
    

class User(userBase , table = True):
    id : Optional[int] = Field(default = None , primary_key = True)
    withdrawal : Optional[Withdrawal] = Relationship(back_populates = "user")
    pin : Optional[Pin] = Relationship(back_populates = "user")
    referral : Optional[Referral] = Relationship(back_populates = "user")


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

class UserWithAll(UserRead):
    withdrawal : WithdrawalRead
    pin : PinRead
    referral : ReferralRead
    
    