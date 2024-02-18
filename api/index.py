from fastapi import FastAPI , Depends , HTTPException, Query
from typing import Annotated
from sqlmodel import Session , select
from api.db import  get_db , create_db_and_tables
from api.models import *
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
origins = [
    
    "http://localhost",
    "http://localhost:3000",
    "http://127.0.0.1:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.on_event("startup")
def on_startup():
    create_db_and_tables()

# @app.get("/")
# def read_root():
#     return {"Hello": "World"}


# get all the users

@app.get("/api/users" , response_model=list[User])
def get_users(session : Annotated[Session, Depends(get_db)]):
    users = session.exec(select(User)).all()
    return users

# create new user

@app.post("/api/create_users" , response_model=UserRead)
def create_user(user : UserCreate , session : Annotated[Session, Depends(get_db)]):
    user_to_insert = User.model_validate(user)
    session.add(user_to_insert)
    session.commit()
    session.refresh(user_to_insert)
    return user_to_insert

# get user by id
@app.get("/api/users/{user_id}" , response_model=UserRead)
def get_user_by_id(user_id : int , session : Annotated[Session, Depends(get_db)]):
    user = session.get(User , user_id)
    if not user:
        raise HTTPException(status_code=404 , detail="User not found")
    return user

# update user

@app.put("/api/users/{user_id}")
def update_user(user_id : int , user : UserUpdate , session : Annotated[Session, Depends(get_db)]):
    user_to_update = session.get(User , user_id)
    if not user_to_update:
        raise HTTPException(status_code=404 , detail="User not found")
    user_to_update.name = user.name
    user_to_update.email = user.email
    session.add(user_to_update)
    session.commit()
    session.refresh(user_to_update)
    return user_to_update

# delete user

@app.delete("/api/users/{user_id}")
def delete_user(user_id : int , session : Annotated[Session, Depends(get_db)]):
    user_to_delete = session.get(User , user_id)
    if not user_to_delete:
        raise HTTPException(status_code=404 , detail="User not found")
    session.delete(user_to_delete)
    session.commit()
    return {"message" : "User deleted"}


# get all the roles

@app.get("/api/roles" , response_model=list[Role])
def get_roles(session : Annotated[Session, Depends(get_db)], offset : int = Query(default=0 , le= 4), limit : int = Query(default=2 , le=4)):
    roles = session.exec(select(Role).offset(offset).limit(limit)).all()
    return roles

# create new role

@app.post("/api/create_roles" , response_model=RoleRead)
def create_role(role : RoleCreate , session : Annotated[Session, Depends(get_db)]):
    role_to_insert = Role.model_validate(role)
    session.add(role_to_insert)
    session.commit()
    session.refresh(role_to_insert)
    return role_to_insert

# get role by id

@app.get("/api/roles/{role_id}" , response_model=RoleRead)
def get_role_by_id(role_id : int , session : Annotated[Session, Depends(get_db)]):
    role = session.get(Role , role_id)
    if not role:
        raise HTTPException(status_code=404 , detail="Role not found")
    return role

# update role

@app.put("/api/roles/{role_id}")
def update_role(role_id : int , role : RoleUpdate , session : Annotated[Session, Depends(get_db)]):
    role_to_update = session.get(Role , role_id)
    if not role_to_update:
        raise HTTPException(status_code=404 , detail="Role not found")
    role_to_update.role_users = role.role_users
    session.add(role_to_update)
    session.commit()
    session.refresh(role_to_update)
    return role_to_update

# delete role

@app.delete("/api/roles/{role_id}")
def delete_role(role_id : int , session : Annotated[Session, Depends(get_db)]):
    role_to_delete = session.get(Role , role_id)
    if not role_to_delete:
        raise HTTPException(status_code=404 , detail="Role not found")
    session.delete(role_to_delete)
    session.commit()
    return {"message" : "Role deleted"}

# get all the countries

@app.get("/api/countries" , response_model=list[Country])
def get_countries(session : Annotated[Session, Depends(get_db)], offset : int = Query(default=0 , le= 4), limit : int = Query(default=2 , le=4)):
    countries = session.exec(select(Country).offset(offset).limit(limit)).all()
    return countries

# create new country

@app.post("/api/create_countries" , response_model=CountryRead)
def create_country(country : CountryCreate , session : Annotated[Session, Depends(get_db)]):
    country_to_insert = Country.model_validate(country)
    session.add(country_to_insert)
    session.commit()
    session.refresh(country_to_insert)
    return country_to_insert

# get country by id

@app.get("/api/countries/{country_id}" , response_model=CountryRead)
def get_country_by_id(country_id : int , session : Annotated[Session, Depends(get_db)]):
    country = session.get(Country , country_id)
    if not country:
        raise HTTPException(status_code=404 , detail="Country not found")
    return country

# update country

@app.put("/api/countries/{country_id}")
def update_country(country_id : int , country : CountryUpdate , session : Annotated[Session, Depends(get_db)]):
    country_to_update = session.get(Country , country_id)
    if not country_to_update:
        raise HTTPException(status_code=404 , detail="Country not found")
    country_to_update.country_users = country.country_users
    session.add(country_to_update)
    session.commit()
    session.refresh(country_to_update)
    return country_to_update

# delete country

@app.delete("/api/countries/{country_id}")
def delete_country(country_id : int , session : Annotated[Session, Depends(get_db)]):
    country_to_delete = session.get(Country , country_id)
    if not country_to_delete:
        raise HTTPException(status_code=404 , detail="Country not found")
    session.delete(country_to_delete)
    session.commit()
    return {"message" : "Country deleted"}

# get all the cities

@app.get("/api/cities" , response_model=list[City])
def get_cities(session : Annotated[Session, Depends(get_db)], offset : int = Query(default=0 , le= 4), limit : int = Query(default=2 , le=4)):
    cities = session.exec(select(City).offset(offset).limit(limit)).all()
    return cities

# create new city

@app.post("/api/create_cities" , response_model=CityRead)
def create_city(city : CityCreate , session : Annotated[Session, Depends(get_db)]):
    city_to_insert = City.model_validate(city)
    session.add(city_to_insert)
    session.commit()
    session.refresh(city_to_insert)
    return city_to_insert

# get city by id

@app.get("/api/cities/{city_id}" , response_model=CityRead)
def get_city_by_id(city_id : int , session : Annotated[Session, Depends(get_db)]):
    city = session.get(City , city_id)
    if not city:
        raise HTTPException(status_code=404 , detail="City not found")
    return city

# update city

@app.put("/api/cities/{city_id}")
def update_city(city_id : int , city : CityUpdate , session : Annotated[Session, Depends(get_db)]):
    city_to_update = session.get(City , city_id)
    if not city_to_update:
        raise HTTPException(status_code=404 , detail="City not found")
    city_to_update.city_users = city.city_users
    session.add(city_to_update)
    session.commit()
    session.refresh(city_to_update)
    return city_to_update

# delete city

@app.delete("/api/cities/{city_id}")
def delete_city(city_id : int , session : Annotated[Session, Depends(get_db)]):
    city_to_delete = session.get(City , city_id)
    if not city_to_delete:
        raise HTTPException(status_code=404 , detail="City not found")
    session.delete(city_to_delete)
    session.commit()
    return {"message" : "City deleted"}

# get all the pins

@app.get("/api/pins" , response_model=list[Pin])
def get_pins(session : Annotated[Session, Depends(get_db)], offset : int = Query(default=0 , le= 4), limit : int = Query(default=2 , le=4)):
    pins = session.exec(select(Pin).offset(offset).limit(limit)).all()
    return pins

# create new pin

@app.post("/api/create_pins" , response_model=PinRead)
def create_pin(pin : PinCreate , session : Annotated[Session, Depends(get_db)]):
    pin_to_insert = Pin.model_validate(pin)
    session.add(pin_to_insert)
    session.commit()
    session.refresh(pin_to_insert)
    return pin_to_insert

# get pin by id

@app.get("/api/pins/{pin_id}" , response_model=PinRead)
def get_pin_by_id(pin_id : int , session : Annotated[Session, Depends(get_db)]):
    pin = session.get(Pin , pin_id)
    if not pin:
        raise HTTPException(status_code=404 , detail="Pin not found")
    return pin

# update pin

@app.put("/api/pins/{pin_id}")
def update_pin(pin_id : int , pin : PinUpdate , session : Annotated[Session, Depends(get_db)]):
    pin_to_update = session.get(Pin , pin_id)
    if not pin_to_update:
        raise HTTPException(status_code=404 , detail="Pin not found")
    pin_to_update.pin_users = pin.pin_users
    session.add(pin_to_update)
    session.commit()
    session.refresh(pin_to_update)
    return pin_to_update

# delete pin

@app.delete("/api/pins/{pin_id}")
def delete_pin(pin_id : int , session : Annotated[Session, Depends(get_db)]):
    pin_to_delete = session.get(Pin , pin_id)
    if not pin_to_delete:
        raise HTTPException(status_code=404 , detail="Pin not found")
    session.delete(pin_to_delete)
    session.commit()
    return {"message" : "Pin deleted"}

# get all the withdraws

@app.get("/api/withdraws" , response_model=list[Withdraw])
def get_withdraws(session : Annotated[Session, Depends(get_db)], offset : int = Query(default=0 , le= 4), limit : int = Query(default=2 , le=4)):
    withdraws = session.exec(select(Withdraw).offset(offset).limit(limit)).all()
    return withdraws

# create new withdraw

@app.post("/api/create_withdraws" , response_model=WithdrawRead)
def create_withdraw(withdraw : WithdrawCreate , session : Annotated[Session, Depends(get_db)]):
    withdraw_to_insert = Withdraw.model_validate(withdraw)
    session.add(withdraw_to_insert)
    session.commit()
    session.refresh(withdraw_to_insert)
    return withdraw_to_insert

# get withdraw by id

@app.get("/api/withdraws/{withdraw_id}" , response_model=WithdrawRead)
def get_withdraw_by_id(withdraw_id : int , session : Annotated[Session, Depends(get_db)]):
    withdraw = session.get(Withdraw , withdraw_id)
    if not withdraw:
        raise HTTPException(status_code=404 , detail="Withdraw not found")
    return withdraw

# update withdraw

@app.put("/api/withdraws/{withdraw_id}")
def update_withdraw(withdraw_id : int , withdraw : WithdrawUpdate , session : Annotated[Session, Depends(get_db)]):
    withdraw_to_update = session.get(Withdraw , withdraw_id)
    if not withdraw_to_update:
        raise HTTPException(status_code=404 , detail="Withdraw not found")
    withdraw_to_update.withdraw_users = withdraw.withdraw_users
    session.add(withdraw_to_update)
    session.commit()
    session.refresh(withdraw_to_update)
    return withdraw_to_update

# delete withdraw

@app.delete("/api/withdraws/{withdraw_id}")
def delete_withdraw(withdraw_id : int , session : Annotated[Session, Depends(get_db)]):
    withdraw_to_delete = session.get(Withdraw , withdraw_id)
    if not withdraw_to_delete:
        raise HTTPException(status_code=404 , detail="Withdraw not found")
    session.delete(withdraw_to_delete)
    session.commit()
    return {"message" : "Withdraw deleted"}

#get all the referrals

@app.get("/api/referrals" , response_model=list[Referral])
def get_referrals(session : Annotated[Session, Depends(get_db)], offset : int = Query(default=0 , le= 4), limit : int = Query(default=2 , le=4)):
    referrals = session.exec(select(Referral).offset(offset).limit(limit)).all()
    return referrals

# create new referral

@app.post("/api/create_referrals" , response_model=ReferralRead)
def create_referral(referral : ReferralCreate , session : Annotated[Session, Depends(get_db)]):
    referral_to_insert = Referral.model_validate(referral)
    session.add(referral_to_insert)
    session.commit()
    session.refresh(referral_to_insert)
    return referral_to_insert

# get referral by id

@app.get("/api/referrals/{referral_id}" , response_model=ReferralRead)
def get_referral_by_id(referral_id : int , session : Annotated[Session, Depends(get_db)]):
    referral = session.get(Referral , referral_id)
    if not referral:
        raise HTTPException(status_code=404 , detail="Referral not found")
    return referral

# update referral

@app.put("/api/referrals/{referral_id}")
def update_referral(referral_id : int , referral : ReferralUpdate , session : Annotated[Session, Depends(get_db)]):
    referral_to_update = session.get(Referral , referral_id)
    if not referral_to_update:
        raise HTTPException(status_code=404 , detail="Referral not found")
    referral_to_update.referral_users = referral.referral_users
    session.add(referral_to_update)
    session.commit()
    session.refresh(referral_to_update)
    return referral_to_update

# delete referral

@app.delete("/api/referrals/{referral_id}")
def delete_referral(referral_id : int , session : Annotated[Session, Depends(get_db)]):
    referral_to_delete = session.get(Referral , referral_id)
    if not referral_to_delete:
        raise HTTPException(status_code=404 , detail="Referral not found")
    session.delete(referral_to_delete)
    session.commit()
    return {"message" : "Referral deleted"}

# get all the packages

@app.get("/api/packages" , response_model=list[Package])
def get_packages(session : Annotated[Session, Depends(get_db)], offset : int = Query(default=0 , le= 4), limit : int = Query(default=2 , le=4)):
    packages = session.exec(select(Package).offset(offset).limit(limit)).all()
    return packages

# create new package

@app.post("/api/create_packages" , response_model=PackageRead)
def create_package(package : PackageCreate , session : Annotated[Session, Depends(get_db)]):
    package_to_insert = Package.model_validate(package)
    session.add(package_to_insert)
    session.commit()
    session.refresh(package_to_insert)
    return package_to_insert

# get package by id

@app.get("/api/packages/{package_id}" , response_model=PackageRead)
def get_package_by_id(package_id : int , session : Annotated[Session, Depends(get_db)]):
    package = session.get(Package , package_id)
    if not package:
        raise HTTPException(status_code=404 , detail="Package not found")
    return package

# update package

@app.put("/api/packages/{package_id}")
def update_package(package_id : int , package : PackageUpdate , session : Annotated[Session, Depends(get_db)]):
    package_to_update = session.get(Package , package_id)
    if not package_to_update:
        raise HTTPException(status_code=404 , detail="Package not found")
    package_to_update.package_users = package.package_users
    session.add(package_to_update)
    session.commit()
    session.refresh(package_to_update)
    return package_to_update

# delete package

@app.delete("/api/packages/{package_id}")
def delete_package(package_id : int , session : Annotated[Session, Depends(get_db)]):
    package_to_delete = session.get(Package , package_id)
    if not package_to_delete:
        raise HTTPException(status_code=404 , detail="Package not found")
    session.delete(package_to_delete)
    session.commit()
    return {"message" : "Package deleted"}

