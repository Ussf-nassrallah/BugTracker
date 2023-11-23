#!/usr/bin/python3
"""Authentication provider"""
from models.user import User
from werkzeug.security import check_password_hash
from models import storage


def authenticate(email, password):
    user = storage.get_by_email(email)
    if not user or not check_password_hash(user.password, password):
        return False
    return {
        "id": user.id,
        "email": user.email,
        "role": user.role,
        "username": user.username,
    }
