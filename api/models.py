from sqlmodel import Field, SQLModel, Relationship
from typing import Optional

# role model


class RoleBase(SQLModel):
<<<<<<< HEAD
    name: str
    description: str


=======
    name : str
    description : str
 
>>>>>>> af41425eed9967ba59136b04a53cd5abafe3c715
class Role(RoleBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    role_users: list["User"] = Relationship(back_populates="role")


class RoleRead(RoleBase):
    id: int


class RoleCreate(RoleBase):
    pass


class RoleUpdate(RoleBase):
    pass

# country model


class CountryBase(SQLModel):
<<<<<<< HEAD
    name: str

=======
    name : str
    
>>>>>>> af41425eed9967ba59136b04a53cd5abafe3c715

class Country(CountryBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    country_users: list["User"] = Relationship(back_populates="country")


class CountryRead(CountryBase):
    id: int


class CountryCreate(CountryBase):
    pass


class CountryUpdate(CountryBase):
    pass


# city model

class CityBase(SQLModel):
<<<<<<< HEAD
    name: str

=======
    name : str
  
>>>>>>> af41425eed9967ba59136b04a53cd5abafe3c715

class City(CityBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    city_users: list["User"] = Relationship(back_populates="city")


class CityRead(CityBase):
    id: int


class CityCreate(CityBase):
    pass


class CityUpdate(CityBase):
    pass

# pin model


class PinBase(SQLModel):
<<<<<<< HEAD
    name: str

=======
    name : str
   
>>>>>>> af41425eed9967ba59136b04a53cd5abafe3c715

class Pin(PinBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    pin_users: list["User"] = Relationship(back_populates="pin")


class PinRead(PinBase):
    id: int


class PinCreate(PinBase):
    pass


class PinUpdate(PinBase):
    pass

# withdraw model


class WithdrawBase(SQLModel):
<<<<<<< HEAD
    amount: str

=======
    amount : str
   
>>>>>>> af41425eed9967ba59136b04a53cd5abafe3c715

class Withdraw(WithdrawBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    withdraw_users: list["User"] = Relationship(back_populates="withdraw")


class WithdrawRead(WithdrawBase):
    id: int


class WithdrawCreate(WithdrawBase):
    pass


class WithdrawUpdate(WithdrawBase):
    pass

# referral model


class ReferralBase(SQLModel):
<<<<<<< HEAD
    name: str

=======
    name : str
    
>>>>>>> af41425eed9967ba59136b04a53cd5abafe3c715

class Referral(ReferralBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    referral_users: list["User"] = Relationship(back_populates="referral")


class ReferralRead(ReferralBase):
    id: int


class ReferralCreate(ReferralBase):
    pass


class ReferralUpdate(ReferralBase):
    pass

# package model


class PackageBase(SQLModel):
<<<<<<< HEAD
    name: str
    created_at: str
    updated_at: str
=======
    name : str
   
>>>>>>> af41425eed9967ba59136b04a53cd5abafe3c715


class Package(PackageBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    package_users: list["User"] = Relationship(back_populates="package")


class PackageRead(PackageBase):
    id: int


class PackageCreate(PackageBase):
    pass


class PackageUpdate(PackageBase):
    pass

# user model


class UserBase(SQLModel):
    national_id: str
    email: str
    phone: str
    created_at: str
    updated_at: str
    currency: str
    role_id: int = Field(foreign_key="role.id")
    country_id: int = Field(foreign_key="country.id")
    city_id: int = Field(foreign_key="city.id")
    pin_id: int = Field(foreign_key="pin.id")
    withdraw_id: int = Field(foreign_key="withdraw.id")
    referral_id: int = Field(foreign_key="referral.id")
    package_id: int = Field(foreign_key="package.id")


class User(UserBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    role: Optional[Role] = Relationship(back_populates="role_users")
    country: Optional[Country] = Relationship(back_populates="country_users")
    city: Optional[City] = Relationship(back_populates="city_users")
    pin: Optional[Pin] = Relationship(back_populates="pin_users")
    withdraw: Optional[Withdraw] = Relationship(
        back_populates="withdraw_users")
    referral: Optional[Referral] = Relationship(
        back_populates="referral_users")
    package: Optional[Package] = Relationship(back_populates="package_users")


class UserRead(UserBase):
    id: int


class UserCreate(UserBase):
    pass


class UserUpdate(UserBase):
    pass
