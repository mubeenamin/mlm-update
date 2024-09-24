from datetime import datetime
from sqlmodel import Field, SQLModel, Relationship
from typing import Optional, List
from decimal import Decimal



class userBase(SQLModel):
    id: Optional[int] = Field(default = None , primary_key = True, index=True)
    firstName : str
    lastName : str
    nation_id : str
    email : str 
    password : str
    phone : str
    currency : str
    country : str
    city : str
    name : str
    created_at: str
    
class User(userBase , table = True):
    
    Balances : Optional["Balance"] = Relationship(back_populates="user") 
    Withdrawals : List['Withdrawal'] = Relationship(back_populates="user")
    Pin : Optional["Pin"] = Relationship(back_populates="user")
    referrals: List["Referral"] = Relationship(back_populates="referrer",sa_relationship_kwargs={"foreign_keys": "[Referral.referrer_user_id]"})
    notifications: List["notification"] = Relationship(back_populates="user")

class UserRead(userBase):
    Balances : Optional["Balance"]
    Withdrawals: List["Withdrawal"]
    Pin : Optional["Pin"]
    referrals: List["Referral"]
    notifications: List["notification"]
    
    
class AdminCreate(SQLModel):

    firstName : str
    lastName : str
    nation_id : str
    email : str 
    password : str
    phone : str
    currency : str
    country : str
    city : str
    name : str
    created_at: str
    initial_balance: Decimal
    userPackage: str
    

class UserCreate(SQLModel):
    firstName : str
    lastName : str
    nation_id : str
    email : str 
    password : str
    phone : str
    currency : str
    country : str
    city : str
    name : str
    created_at: str
    referrer_user_id: int
    referral_type_name: str
    initial_balance: Decimal
    userPackage: str

class notificationBase(SQLModel):
    title : str
    message : str
    user_id : Optional[int] = Field(default = None , foreign_key = "user.id")

class notificationCreate(notificationBase):
    pass

class notification(notificationBase , table = True):
    id : Optional[int] = Field(default = None , primary_key = True, index=True)
    user : Optional["User"] = Relationship(back_populates = "notifications")


class balanceBase(SQLModel):
    balance : Decimal
    package: str
    user_id : Optional[int] = Field(default = None , foreign_key = "user.id")
    
class BalanceCreate(balanceBase):
    pass
class BalanceUpdate(SQLModel):
    balance : Optional[Decimal]
    
class Balance(balanceBase , table = True):
    id : Optional[int] = Field(default = None , primary_key = True, index=True)
    user : Optional["User"] = Relationship(back_populates = "Balances")
    
class TotalBalance(SQLModel):
    total_balance : Decimal

class WithdrawalBase(SQLModel): 
    withdrawal_amount : Decimal
    firstName : str
    lastName : str
    idNumber : str
    country : str
    bankName : str
    iban : str
    contact : str
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
    

class Message(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    email: str
    sender_id: int = Field(foreign_key="user.id")
    recipient_id: int = Field(foreign_key="user.id")
    content: str



class Token(SQLModel):
    access_token: str
    token_type: str