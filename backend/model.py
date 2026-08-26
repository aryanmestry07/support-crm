from sqlalchemy import Column, Integer, String, Text, DateTime , ForeignKey
from sqlalchemy.orm import relationship
from database import Base 


class Ticket(Base):

    __tablename__ = "tickets"

    id = Column(Integer, primary_key=True, index=True)
    ticket_id = Column(String, unique=True, index=True, nullable=False)
    customer_name = Column(String, nullable=False)
    customer_email = Column(String, nullable=False)
    subject = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    status = Column(String, default="Open", nullable=False)
    created_at = Column(DateTime, nullable=False)
    updated_at = Column(DateTime, nullable=False)

    notes = relationship(
        "Note",
        back_populates="ticket",
        cascade = "all, delete"

    )

class Note(Base):
        __tablename__ = "notes"

        id = Column(Integer, primary_key=True, index=True)

        ticket_id = Column(
        String,
        ForeignKey("tickets.ticket_id"),
        nullable=False
    )

        note_text = Column(Text, nullable=False)

        created_at = Column(DateTime, nullable=False)

        ticket = relationship(
        "Ticket",
        back_populates="notes"
    )