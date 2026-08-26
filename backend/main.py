from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import Base, engine
from routes.tickets import router as ticket_router


# Create Tables
Base.metadata.create_all(bind=engine)


app = FastAPI()


# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://support-crm-azure.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Register Routes
app.include_router(ticket_router)


# Health Check
@app.get("/")
def hello():
    return {
        "message": "Welcome to Support CRM"
    }