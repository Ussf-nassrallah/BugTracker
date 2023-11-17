#!/usr/bin/python3
"""user model"""
import sqlalchemy
from sqlalchemy import Column, String, Integer, ForeignKey, Table
from sqlalchemy.orm import relationship
from models.base_model import Base

class User(Base):
    """user model"""
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    username = Column(String(128), nullable=False)
    email = Column(String(128), nullable=False)
    password = Column(String(256), nullable=False)
    roles = Column(String(128), nullable=False)
    
    def to_dict(self):
        """returns a dictionary containing all keys/values of __dict__"""
        new_dict = dict(self.__dict__)
        if '_sa_instance_state' in new_dict:
            del new_dict['_sa_instance_state']
        return new_dict