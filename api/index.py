from fastapi import FastAPI
from api.db import  engine
from api.models import *
from fastapi.middleware.cors import CORSMiddleware
from apscheduler.schedulers.background import BackgroundScheduler
from api.routers import auth, withdrawal, pin, directRefferal, indirectRefferal



# def update_balance_gold_platinum():
#     with Session(engine) as session:
#         session.exec(update(User).where(User.package.in_(["Bronze" , "Bronze Plus" , "Gold" , "Gold Plus" , "Platinum" , "Platinum Plus" , "Diamond", "Diamond Plus"])).values(balance = User.balance + case({"Bronze" : 1 , "Bronze Plus" : 2 , "Gold" : 4 , "Gold Plus" : 8 , "Platinum" : 64 , "Platinum Plus" : 128 , "Diamond" : 16 , "Diamond Plus" : 32} , value = User.package)))
#         session.commit()
#         return {"message" : "Balance Updated"}
        
# scheduler = BackgroundScheduler()
# scheduler.add_job(update_balance_gold_platinum , 'interval' , minutes = 60)






app = FastAPI()

SQLModel.metadata.create_all(bind=engine)

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

@app.get("/")
def health_check():
    return {"message" : "Hello World"}


app.include_router(auth.router)
app.include_router(withdrawal.router)
app.include_router(pin.router)
app.include_router(directRefferal.router)
app.include_router(indirectRefferal.router)
