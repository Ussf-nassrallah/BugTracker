#!/usr/bin/python3
""" Module for storing the Role class definition. """
from sqlalchemy import Column, Integer, String
from models.base_model import Base


class Role(Base):
    """ Class representing a role a user can have. """
    __tablename__ = 'roles'
    id = Column(Integer, primary_key=True)
    name = Column(String(128), nullable=False)
