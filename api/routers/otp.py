from fastapi import APIRouter, FastAPI, HTTPException, Request, Form, Response
from fastapi.responses import JSONResponse
import smtplib
from email.mime.text import MIMEText
import random
import os
from dotenv import load_dotenv
from sqlmodel import select
from api.dep import bcrypt_context, db_dependency

from api.models import User

# Load environment variables
load_dotenv()

router = APIRouter(
    prefix="/api/routers/otp",
    tags=["OTP"]
)

# In-memory storage for OTPs (for demo purposes; use a database in production)
otp_storage = {}

# Function to generate a random 6-digit OTP
def generate_otp():
    return str(random.randint(100000, 999999))

# Function to send OTP via email
def send_otp_email(email: str, otp: str):
    sender_email = os.getenv("EMAIL_ADDRESS")
    sender_password = os.getenv("EMAIL_PASSWORD")
    smtp_server = os.getenv("SMTP_SERVER")
    smtp_port = int(os.getenv("SMTP_PORT"))

    message = MIMEText(f"Your OTP is: {otp}")
    message["Subject"] = "Your OTP Code"
    message["From"] = sender_email
    message["To"] = email

    try:
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, email, message.as_string())
        return True
    except Exception as e:
        print(f"Error sending email: {e}")
        return False

# Endpoint to generate and send OTP
@router.post("/send-otp")
async def send_otp(email: str = Form(...)):
    try:
        otp = generate_otp()
        otp_storage[email] = otp  # Store OTP for verification

        if send_otp_email(email, otp):
            return JSONResponse(content={"message": "OTP sent successfully"})
        else:
            raise HTTPException(status_code=500, detail="Failed to send OTP")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
# Endpoint to verify OTP
@router.post("/verify-otp")
async def verify_otp(email: str = Form(...), otp: str = Form(...)):
    stored_otp = otp_storage.get(email)

    if stored_otp and stored_otp == otp:
        del otp_storage[email]  # Clear OTP after successful verification
        return JSONResponse(content={"message": "OTP verified successfully"})
    else:
        raise HTTPException(status_code=400, detail="Invalid OTP")

# Add to your existing FastAPI code
# @router.post("/change-password")
# async def change_password(
#     email: str = None,
#     new_password: str = None,
   
# ):  
#             # Validate input
#     if not email or not new_password:
#         raise HTTPException(status_code=404, detail="Email and new password are required")

#     # Get user from database
#     db_user = db.exec(select(User).where(User.email == email)).first()
#     if not db_user:
#         raise HTTPException(status_code=404, detail="User not found")

#     # Hash the new password
#     hashed_password = bcrypt_context.hash(new_password)

#     try:
#         # Update password and save
#         db_user.password = hashed_password
#         db.add(db_user)
#         db.commit()
#         db.refresh(db_user)
#     except Exception as e:
#         db.rollback()  # Rollback in case of error
#         raise HTTPException(status_code=404, detail="Failed to update password")

#     return {"message": "Password changed successfully"}