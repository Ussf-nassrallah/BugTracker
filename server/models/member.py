#!/usr/bin/python3
"""member model"""
from sqlalchemy import Column, String, Integer, ForeignKey, Table
from sqlalchemy.orm import relationship
from models.base_model import Base


class Member(Base):
    '''member model'''
    __tablename__ = 'members'
    id = Column(Integer, primary_key=True, nullable=False, autoincrement=True)
    project_id = Column(String(60), ForeignKey('projects.id'))
    user_id = Column(String(60), ForeignKey('users.id'))
    
    def to_dict(self):
        """returns a dictionary containing all keys/values of __dict__"""
        new_dict = dict(self.__dict__)
        if '_sa_instance_state' in new_dict:
            del new_dict['_sa_instance_state']
        return new_dict