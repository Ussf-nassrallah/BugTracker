#!/usr/bin/python3
"""user model"""
import uuid
from sqlalchemy import Column, String, Integer, ForeignKey, Table
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.mssql import CHAR
from models.base_model import Base



class User(Base):
    """user model"""
    __tablename__ = 'users'
    id = Column(CHAR(60), primary_key=True, default=str(uuid.uuid4()), nullable=False)
    username = Column(String(128), nullable=False, unique=True)
    email = Column(String(128), nullable=False, unique=True)
    password = Column(String(256), nullable=False)
    gender = Column(String(128), nullable=False)
    age = Column(Integer, nullable=False)
    phone = Column(String(128), nullable=False)
    role = Column(String(128), nullable=False)
    projects = relationship("Project", backref="created_by_user")
    tickets = relationship("Ticket", backref="created_by_user")
    
    def to_dict(self):
        """returns a dictionary containing all keys/values of __dict__"""
        new_dict = dict(self.__dict__)
        if '_sa_instance_state' in new_dict:
            del new_dict['_sa_instance_state']
        return new_dict