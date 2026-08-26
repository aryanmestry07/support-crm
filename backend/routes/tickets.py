from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
from typing import Optional

from database import get_db
from model import Ticket, Note
from schemas import (
    TicketCreate,
    TicketListResponse,
    TicketResponse,
    TicketUpdate,
    TicketCreateResponse,
    TicketUpdateResponse
)


router = APIRouter()


# Create Ticket
@router.post(
    "/api/tickets",
    response_model=TicketCreateResponse
)
def create_ticket(
    ticket: TicketCreate,
    db: Session = Depends(get_db)
):

    last_ticket = (
        db.query(Ticket)
        .order_by(Ticket.id.desc())
        .first()
    )

    if last_ticket:
        ticket_number = last_ticket.id + 1
    else:
        ticket_number = 1

    ticket_id = f"TKT-{ticket_number:03d}"

    current_time = datetime.now()

    new_ticket = Ticket(
        ticket_id=ticket_id,
        customer_name=ticket.customer_name,
        customer_email=ticket.customer_email,
        subject=ticket.subject,
        description=ticket.description,
        status="Open",
        created_at=current_time,
        updated_at=current_time
    )

    db.add(new_ticket)
    db.commit()
    db.refresh(new_ticket)

    return {
        "ticket_id": new_ticket.ticket_id,
        "created_at": new_ticket.created_at
    }


# List Tickets
@router.get(
    "/api/tickets",
    response_model=list[TicketListResponse]
)
def get_tickets(
    status: Optional[str] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):

    query = (
        db.query(Ticket)
        .order_by(Ticket.created_at.desc())
    )

    if status:
        query = query.filter(
            Ticket.status == status
        )

    if search:
        search_value = f"%{search}%"

        query = query.filter(
            (Ticket.ticket_id.ilike(search_value)) |
            (Ticket.customer_name.ilike(search_value)) |
            (Ticket.customer_email.ilike(search_value)) |
            (Ticket.description.ilike(search_value))
        )

    return query.all()


# Get Ticket
@router.get(
    "/api/tickets/{ticket_id}",
    response_model=TicketResponse
)
def get_ticket(
    ticket_id: str,
    db: Session = Depends(get_db)
):

    ticket = (
        db.query(Ticket)
        .filter(Ticket.ticket_id == ticket_id)
        .first()
    )

    if not ticket:
        raise HTTPException(
            status_code=404,
            detail="Ticket not found"
        )

    return ticket


# Update Ticket
@router.put(
    "/api/tickets/{ticket_id}",
    response_model=TicketUpdateResponse
)
def update_ticket(
    ticket_id: str,
    ticket: TicketUpdate,
    db: Session = Depends(get_db)
):

    existing_ticket = (
        db.query(Ticket)
        .filter(Ticket.ticket_id == ticket_id)
        .first()
    )

    if not existing_ticket:
        raise HTTPException(
            status_code=404,
            detail="Ticket not found"
        )

    # Update Status
    if ticket.status is not None:
        existing_ticket.status = ticket.status # type: ignore


    # Add Note
    if ticket.notes and ticket.notes.strip():

        new_note = Note(
            ticket_id=existing_ticket.ticket_id,
            note_text=ticket.notes.strip(),
            created_at=datetime.now()
        )

        db.add(new_note)

    existing_ticket.updated_at = datetime.now()  # type: ignore

    db.commit()
    db.refresh(existing_ticket)

    return {
        "success": True,
        "updated_at": existing_ticket.updated_at
    }