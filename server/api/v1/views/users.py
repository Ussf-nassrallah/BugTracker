#!/usr/bin/python3
"""get all users module"""
from api.v1.views import app_views
from flask import jsonify, abort, request
from models import storage
from models.user import User


@app_views.route('/users/<user_id>', methods=['GET'])
def get_user(user_id):
    """get user by id"""
    user = storage.get(User, user_id)
    if user is None:
        abort(404)
    return jsonify(user.to_dict()), 200

@app_views.route('/users', methods=['GET'])
def get_users():
    """get all users"""
    users = storage.all(User)
    users_list = []
    for user in users.values():
        users_list.append(user.to_dict())
    return jsonify(users_list), 200