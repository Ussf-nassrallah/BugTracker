#!/usr/bin/python3
"""
initialize the models package
"""
from models.engine import db_storage

storage = db_storage.DBStorage()
storage.reload()