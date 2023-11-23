#!/usr/bin/python3
"""ticket model"""
import uuid
import datetime
from api.v1.extensions import db


class Ticket(db.Model):
    """ticket model"""

    __tablename__ = "tickets"
    id = db.Column(
        db.String(60),
        primary_key=True,
        default=lambda: str(uuid.uuid4()),
        nullable=False,
    )
    title = db.Column(db.String(128), nullable=False, unique=True)
    description = db.Column(db.String(256), nullable=False)
    ticket_type = db.Column(db.String(128), nullable=False)
    status = db.Column(db.String(128), default="open")
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow())
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow())
    created_by = db.Column(db.String(60), db.ForeignKey("users.id"))
    parent_id = db.Column(db.String(60), db.ForeignKey("projects.id"))

    def as_dict(self):
        """returns a dictionary containing all keys/values of __dict__"""
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
