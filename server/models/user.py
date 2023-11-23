#!/usr/bin/python3
"""user model"""
import uuid
from datetime import datetime
from api.v1.extensions import db


class User(db.Model):
    """user model"""

    __tablename__ = "users"
    id = db.Column(
        db.String(60),
        primary_key=True,
        default=lambda: str(uuid.uuid4()),
        nullable=False,
    )
    username = db.Column(db.String(128), nullable=False, unique=True)
    email = db.Column(db.String(128), nullable=False, unique=True)
    password = db.Column(db.String(256), nullable=False)
    gender = db.Column(db.String(128), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    phone = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow())
    updated_at = db.Column(db.DateTime, default=datetime.utcnow())
    members = db.relationship("Member", backref="user_ids", cascade="all, delete-orphan")
    projects = db.relationship("Project", backref="created_by_user", cascade="all, delete-orphan")
    tickets = db.relationship("Ticket", backref="created_by_user", cascade="all, delete-orphan")

    def as_dict(self):
        """returns a dictionary containing all keys/values of __dict__"""
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    def get_projects(self):
        """returns a list of projects"""
        return [project.as_dict() for project in self.projects]

    def get_tickets(self):
        """returns a list of tickets"""
        return [ticket.as_dict() for ticket in self.tickets]
