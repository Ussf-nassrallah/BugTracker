#!/usr/bin/python3
"""get all users module"""
from datetime import datetime
from api.v1.views import app_views
from flask import jsonify, abort, request
from models import storage
from models.user import User
from services.auth.auth_guard import auth_guard
from werkzeug.security import generate_password_hash


@app_views.route("/users/<user_id>", methods=["GET"])
@auth_guard(["admin"])
def get_user(user_id):
    """get user by id"""
    user = storage.get(User, user_id)
    if user is None:
        abort(404)
    return jsonify(user.as_dict()), 200


@app_views.route("/users", methods=["GET"])
def get_users():
    """get all users"""
    users = storage.all(User)
    users_list = []
    for user in users.values():
        users_list.append(user.as_dict())
    return jsonify(users_list), 200


@app_views.route("/users/<user_id>", methods=["PUT"])
def update_user(user_id):
    """update user information"""
    user = storage.get(User, user_id)
    if user is None:
        abort(404)
    if not request.json:
        abort(400, description="Not a JSON")
    for key, value in request.json.items():
        if key not in ["id", "created_at", "updated_at"]:
            setattr(user, key, value)
    if "password" in request.json:
        user.password = generate_password_hash(
            request.json["password"], method="pbkdf2:sha256"
        )
    user.updated_at = datetime.utcnow()
    storage.save()
    return jsonify(user.as_dict()), 200


@app_views.route("/users/<user_id>/projects", methods=["GET"])
def get_user_projects(user_id):
    """get user projects"""
    user = storage.get(User, user_id)
    if user is None:
        abort(404)
    projects = user.get_projects()
    return jsonify(projects), 200


@app_views.route("/users/<user_id>/projects/<project_id>", methods=["GET"])
def get_user_project(user_id, project_id):
    """get user project by user_id and project_id"""
    user = storage.get(User, user_id)
    if user is None:
        abort(404)
    projects = user.get_projects()
    for project in projects:
        if project["id"] == project_id:
            return jsonify(project), 200
    abort(404)


@app_views.route("/users/<user_id>/tickets", methods=["GET"])
def get_user_tickets(user_id):
    """get user tickets"""
    user = storage.get(User, user_id)
    if user is None:
        abort(404)
    tickets = user.get_tickets()
    return jsonify(tickets), 200


@app_views.route("/users/<user_id>/tickets/<ticket_id>", methods=["GET"])
def get_user_ticket(user_id, ticket_id):
    """get user ticket by user_id and ticket_id"""
    user = storage.get(User, user_id)
    if user is None:
        abort(404)
    tickets = user.get_tickets()
    for ticket in tickets:
        if ticket["id"] == ticket_id:
            return jsonify(ticket), 200
    abort(404)


@app_views.route("/users/<user_id>/projects/<project_id>", methods=["PUT"])
def update_user_project(user_id, project_id):
    """update user project by user_id and project_id"""
    user = storage.get(User, user_id)
    if user is None:
        abort(404)
    projects = user.projects
    for project in projects:
        if project.id == project_id:
            if not request.json:
                abort(400, description="Not a JSON")
            for key, value in request.json.items():
                if key not in ["id", "created_at", "updated_at", "created_by"]:
                    setattr(project, key, value)
            project.updated_at = datetime.utcnow()
            storage.save()
            return jsonify(project.as_dict()), 200
    abort(404)


@app_views.route("/users/<user_id>/tickets/<ticket_id>", methods=["PUT"])
def update_user_ticket(user_id, ticket_id):
    """update user ticket by user_id and ticket_id"""
    user = storage.get(User, user_id)
    if user is None:
        abort(404)
    tickets = user.tickets
    for ticket in tickets:
        if ticket.id == ticket_id:
            if not request.json:
                abort(400, description="Not a JSON")
            for key, value in request.json.items():
                if key not in [
                    "id",
                    "created_at",
                    "updated_at",
                    "created_by",
                    "parent_id",
                ]:
                    setattr(ticket, key, value)
            ticket.updated_at = datetime.utcnow()
            storage.save()
            return jsonify(ticket.as_dict()), 200
    abort(404)


@app_views.route("/users/<user_id>", methods=["DELETE"])
def delete_user(user_id):
    """delete user by id"""
    user = storage.get(User, user_id)
    if user is None:
        abort(404)
    storage.delete(user)
    storage.save()
    return jsonify({"message": "User deleted"}), 202


@app_views.route("/users/<user_id>/projects/<project_id>", methods=["DELETE"])
def delete_user_project(user_id, project_id):
    """delete user project by user_id and project_id"""
    user = storage.get(User, user_id)
    if user is None:
        abort(404)
    projects = user.projects
    for project in projects:
        if project.id == project_id:
            storage.delete(project)
            storage.save()
            return jsonify({"message": "Project deleted"}), 202
    abort(404)


@app_views.route("/users/<user_id>/tickets/<ticket_id>", methods=["DELETE"])
def delete_user_ticket(user_id, ticket_id):
    """delete user ticket by user_id and ticket_id"""
    user = storage.get(User, user_id)
    if user is None:
        abort(404)
    tickets = user.tickets
    for ticket in tickets:
        if ticket.id == ticket_id:
            storage.delete(ticket)
            storage.save()
            return jsonify({"message": "Ticket deleted"}), 202
    abort(404)
