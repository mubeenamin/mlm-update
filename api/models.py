from datetime import datetime
from sqlmodel import Field, SQLModel, Relationship
from typing import Optional, List
from decimal import Decimal



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
    
class User(userBase , table = True):
    id : Optional[int] = Field(default = None , primary_key = True, index=True)
    Balances : Optional["Balance"] = Relationship(back_populates="user") 
    Withdrawals : List['Withdrawal'] = Relationship(back_populates="user")
    Pin : Optional["Pin"] = Relationship(back_populates="user")
    referrals: List["Referral"] = Relationship(back_populates="referrer",sa_relationship_kwargs={"foreign_keys": "[Referral.referrer_user_id]"})
    
    

class UserCreate(SQLModel):
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
    referrer_user_id: int
    referral_type_name: str


class balanceBase(SQLModel):
    balance : Decimal
    user_id : Optional[int] = Field(default = None , foreign_key = "user.id")
    
class BalanceCreate(balanceBase):
    pass
    
class Balance(balanceBase , table = True):
    id : Optional[int] = Field(default = None , primary_key = True, index=True)
    user : Optional["User"] = Relationship(back_populates = "Balances")

class WithdrawalBase(SQLModel):
    withdrawal_amount : str
    status : str
    user_id : Optional[int] = Field(default = None , foreign_key = "user.id")
    
class WithdrawalCreate(WithdrawalBase):
    pass

class Withdrawal(WithdrawalBase , table = True):
    id : Optional[int] = Field(default = None , primary_key = True, index=True)
    user : Optional["User"] = Relationship(back_populates = "Withdrawals")
    
    
class WithdrawalUpdate(SQLModel):
    status : Optional[str]

class pinBase(SQLModel):
    pin : str
    user_id : Optional[int] = Field(default = None , foreign_key = "user.id")
    
class PinCreate(pinBase):
    pass

class Pin(pinBase , table = True):
    id : Optional[int] = Field(default = None , primary_key = True, index=True)
    user : Optional["User"] = Relationship(back_populates = "Pin")
    
class PinUpdate(SQLModel):
    pin : Optional[str]


class ReferralType(SQLModel, table=True):
    referral_type_id: Optional[int] = Field(default=None, primary_key=True, index=True)
    referral_type_name: str

class Referral(SQLModel, table=True):
    referral_id: Optional[int] = Field(default=None, primary_key=True, index=True)
    referrer_user_id: int = Field(foreign_key = "user.id")
    referred_user_id: int = Field(foreign_key = "user.id")
    referral_type_id: Optional[int] = Field(default = None , foreign_key="referraltype.referral_type_id")

    referrer: User = Relationship(back_populates="referrals", sa_relationship_kwargs={"foreign_keys": "[Referral.referrer_user_id]"})
    



class Token(SQLModel):
    access_token: str
    token_type: str