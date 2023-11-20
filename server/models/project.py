#!/usr/bin/python3
"""project model"""
import uuid
import datetime
from sqlalchemy import Column, String, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.mssql import CHAR
from models.base_model import Base


class Project(Base):
    '''project model'''
    __tablename__ = 'projects'
    id = Column(CHAR(60), primary_key=True, default=str(uuid.uuid4()), nullable=False)
    name = Column(String(128), nullable=False, unique=True)
    description = Column(String(256), nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow())
    updated_at = Column(DateTime, default=datetime.datetime.utcnow())
    created_by = Column(CHAR(60), ForeignKey('users.id'))
    members = relationship("Member", backref="project_ids")
    tickets = relationship("Ticket", backref="parent_ids")
    
    def to_dict(self):
        """returns a dictionary containing all keys/values of __dict__"""
        new_dict = dict(self.__dict__)
        if '_sa_instance_state' in new_dict:
            del new_dict['_sa_instance_state']
        return new_dict