#!/usr/bin/python3
"""project model"""
import uuid
import datetime
from api.v1.extensions import db


class Project(db.Model):
    """project model"""

    __tablename__ = "projects"
    id = db.Column(
        db.String(60),
        primary_key=True,
        default=lambda: str(uuid.uuid4()),
        nullable=False,
    )
    name = db.Column(db.String(128), nullable=False, unique=True)
    description = db.Column(db.String(256), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow())
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow())
    created_by = db.Column(db.String(60), db.ForeignKey("users.id"))
    link_repo = db.Column(db.String(256), nullable=True)
    members = db.relationship("Member", backref="project_ids")
    tickets = db.relationship(
        "Ticket", backref="parent_ids", cascade="all, delete-orphan"
    )
    onwer = db.relationship("User", backref="created_by", cascade="save-update, merge")

    def as_dict(self):
        """returns a dictionary containing all keys/values of __dict__"""
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "created_by": self.onwer.as_dict_to_resp(),
            "link_repo": self.link_repo,
            "tickets": [ticket.as_dict() for ticket in self.tickets],
            "members": [member.users.as_dict_to_resp() for member in self.members],
        }
        
    def as_dict_to_resp(self):
        """returns a dictionary containing id and name"""
        return {
            "id": self.id,
            "name": self.name,
        }

    def get_tickets(self):
        """returns a list of tickets"""
        return [ticket.as_dict() for ticket in self.tickets]
