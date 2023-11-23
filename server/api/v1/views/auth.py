#!/usr/bin/python3
""" Auth API endpoints """
from datetime import datetime
from api.v1.views import app_views
from flask import jsonify, request
from services.auth.auth_provider import authenticate
from services.auth.jwt_handler import generate_jwt
from services.auth.auth_guard import auth_guard
from werkzeug.security import generate_password_hash, check_password_hash
from models.user import User
from models import storage


@app_views.route("/auth", methods=["POST"])
def auth():
    email = request.json.get("email")
    password = request.json.get("password")
    if not email or not password:
        return jsonify({"message": "Email or password missing", "status": 400}), 400

    user_data = authenticate(email, password)
    if not user_data:
        return jsonify({"message": "Invalid credentials", "status": 400}), 400

    token = generate_jwt(
        payload=user_data, lifetime=60
    )  # <--- generates a JWT with valid within 1 hour by now
    return jsonify({"data": token, "status": 200}), 200


@app_views.route("/signup", methods=["POST"])
def signup():
    email = request.json.get("email")
    password = request.json.get("password")
    username = request.json.get("username")
    role = request.json.get("role")
    age = request.json.get("age")
    phone = request.json.get("phone")
    gender = request.json.get("gender")

    new_user = User(
        email=email,
        password=generate_password_hash(password, method="pbkdf2:sha256"),
        username=username,
        role=role,
        phone=phone,
        gender=gender,
        age=age,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
    )
    storage.new(new_user)
    storage.save()
    return jsonify(new_user.as_dict()), 201
