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
    status: str 
    
class User(userBase , table = True):
    
    Balances : Optional["Balance"] = Relationship(back_populates="user") 
    Withdrawals : List['Withdrawal'] = Relationship(back_populates="user")
    Pin : Optional["Pin"] = Relationship(back_populates="user")
    referrals: List["Referral"] = Relationship(back_populates="referrer",sa_relationship_kwargs={"foreign_keys": "[Referral.referrer_user_id]"})
    notifications: List["notification"] = Relationship(back_populates="user")
    fund: List["Fund"] = Relationship(back_populates="user")
    audit_logs: List["AuditLog"] = Relationship(back_populates="user")
class UserRead(userBase):
    Balances : Optional["Balance"]
    Withdrawals: List["Withdrawal"]
    Pin : Optional["Pin"]
    referrals: List["Referral"]
    notifications: List["notification"]
    fund: List["Fund"]

class UserUpdate(SQLModel):
    status : Optional[str]
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
    initial_balance: float
    userPackage: str
    status: str
    

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
    initial_balance: float
    userPackage: str
    status: str

class UserPasswordUpdate(SQLModel):
    
    password : Optional[str]


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
    balance : float
    package: str
    user_id : Optional[int] = Field(default = None , foreign_key = "user.id")
    
class BalanceCreate(balanceBase):
    pass
class BalanceUpdate(SQLModel):
    balance : Optional[float]
    
class Balance(balanceBase , table = True):
    id : Optional[int] = Field(default = None , primary_key = True, index=True)
    user : Optional["User"] = Relationship(back_populates = "Balances")
    
class TotalBalance(SQLModel):
    total_balance : float

class WithdrawalBase(SQLModel): 
    withdrawal_amount : float
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

class Fund(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    amount: float
    email: str
    date: str
    user: User = Relationship(back_populates="fund")

class FundRead(SQLModel):
    id: int
    user_id: int
    amount: float
    email: str
    date: str
    user: Optional["User"]
    
    
class AuditLogBase(SQLModel):
    user_id: Optional[int] = Field(foreign_key="user.id")
    user_name: str
    date: str  # For simplicity, storing the date as a string (could be `datetime.date` if preferred)
    amount: float
    status: str
    action_description: str  # Maps to "Action"

class AuditLog(AuditLogBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user: Optional["User"] = Relationship(back_populates="audit_logs")

class AuditLogRead(AuditLogBase):
    id: int
