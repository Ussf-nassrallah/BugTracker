#!/usr/bin/python3
"""member model"""
from api.v1.extensions import db


class Member(db.Model):
    """member model"""

    __tablename__ = "members"
    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    project_id = db.Column(db.String(60), db.ForeignKey("projects.id"))
    user_id = db.Column(db.String(60), db.ForeignKey("users.id"))
    __table_args__ = (
        db.UniqueConstraint("project_id", "user_id", name="_project_user_uc"),
    )
    projects = db.relationship("Project", backref="projects")
    users = db.relationship("User", backref="users")
    
    def as_dict(self):
        """returns a dictionary containing all keys/values of __dict__"""
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
