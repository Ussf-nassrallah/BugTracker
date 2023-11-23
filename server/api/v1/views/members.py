#!/usr/bin/python3
""""get and create members module"""
from datetime import datetime
from api.v1.views import app_views
from flask import jsonify, abort, request
from models import storage
from models.member import Member
from models.project import Project
from models.user import User
from services.auth.auth_guard import auth_guard


@app_views.route("/projects/<project_id>/members", methods=["POST"])
def create_member(project_id):
    """create member"""
    user_id = request.json.get("user_id")
    if not user_id:
        return jsonify({"message": "User id missing", "status": 400}), 400
    member = Member(project_id=project_id, user_id=user_id)
    storage.new(member)
    storage.save()
    return jsonify({"message": "Member created", "status": 201}), 201


@app_views.route("/projects/<project_id>/members", methods=["GET"])
def get_members(project_id):
    """get all members"""
    project = storage.get(Project, project_id)
    if not project:
        return jsonify({"message": "Project not found", "status": 404}), 404
    users = []
    for member in project.members:
        user = storage.get(User, member.user_id)
        users.append(user.as_dict())
    return jsonify(users), 200


@app_views.route("/projects/<project_id>/members/<user_id>", methods=["DELETE"])
def delete_member(project_id, user_id):
    """delete member"""
    member = Member.query.filter_by(project_id=project_id, user_id=user_id).first()
    if not member:
        return jsonify({"message": "Member not found", "status": 404}), 404
    storage.delete(member)
    storage.save()
    return jsonify({"message": "Member deleted", "status": 200}), 200


@app_views.route("/members/<user_id>", methods=["GET"])
def get_projects_by_member(user_id):
    """get projects by member"""
    user = storage.get(User, user_id)
    if not user:
        return jsonify({"message": "User not found", "status": 404}), 404
    projects = []
    for member in user.members:
        project = storage.get(Project, member.project_id)
        projects.append(project.as_dict())
    return jsonify(projects), 200
