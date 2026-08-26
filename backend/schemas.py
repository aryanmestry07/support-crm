from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional, Literal


# Create Ticket
class TicketCreate(BaseModel):

    customer_name: str
    customer_email: EmailStr
    subject: str
    description: str


# Note Response
class NoteResponse(BaseModel):

    id: int
    ticket_id: str
    note_text: str
    created_at: datetime

    class Config:
        from_attributes = True


# Ticket Response
class TicketResponse(BaseModel):

    ticket_id: str
    customer_name: str
    customer_email: EmailStr
    subject: str
    description: str
    status: str
    created_at: datetime
    updated_at: datetime

    notes: list[NoteResponse] = Field(
        default_factory=list
    )

    class Config:
        from_attributes = True


# Ticket List
class TicketListResponse(BaseModel):

    ticket_id: str
    customer_name: str
    subject: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


# Update Ticket
class TicketUpdate(BaseModel):

    status: Optional[Literal[
        "Open",
        "In Progress",
        "Closed"
    ]] = None

    notes: Optional[str] = None

class TicketCreateResponse(BaseModel):
    ticket_id: str
    created_at: datetime


class TicketUpdateResponse(BaseModel):
    success: bool
    updated_at: datetime