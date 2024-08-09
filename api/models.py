from datetime import datetime
from sqlmodel import Field, SQLModel, Relationship
from typing import Optional
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
    updated_at: str
    
class User(userBase , table = True):
    id : Optional[int] = Field(default = None , primary_key = True, index=True)
    Balance : Optional["Balance"] = Relationship(back_populates="user") 
    Withdrawals : list['Withdrawal'] = Relationship(back_populates="user")
    Pin : Optional["Pin"] = Relationship(back_populates="user")
    DirectRefferal : Optional["DirectRefferal"] = Relationship(back_populates="user")
    InDirectRefferal : list["InDirectRefferal"] = Relationship(back_populates="user")
    
    

class UserUpdate(SQLModel):
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

class UserCreate(userBase):
    pass


class balanceBase(SQLModel):
    user_id : int
    balance : Decimal
    user_id : Optional[int] = Field(default = None , foreign_key = "user.id")
    
class BalanceCreate(balanceBase):
    pass
    
class Balance(balanceBase , table = True):
    id : Optional[int] = Field(default = None , primary_key = True, index=True)
    user : Optional["User"] = Relationship(back_populates = "Balance")

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


class directRefferalBase(SQLModel):
    refferal_id : str
    user_id : Optional[int] = Field(default = None , foreign_key = "user.id")

class DirectRefferalCreate(directRefferalBase):
    pass

class DirectRefferal(directRefferalBase , table = True):
    id : Optional[int] = Field(default = None , primary_key = True, index=True)
    user : Optional["User"] = Relationship(back_populates = "DirectRefferal")
    

class inDirectRefferalBase(SQLModel):
    user_id : Optional[int] = Field(default = None , foreign_key = "user.id")

class InDirectRefferalCreate(inDirectRefferalBase):
    pass

class InDirectRefferal(inDirectRefferalBase , table = True):
    id : Optional[int] = Field(default = None , primary_key = True, index=True)
    user : Optional["User"] = Relationship(back_populates = "InDirectRefferal")
    


class Token(SQLModel):
    access_token: str
    token_type: str