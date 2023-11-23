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
@auth_guard(["admin"])
def create_member(project_id):
    """create member"""
    return jsonify({"message": "Not implemented"}), 501


@app_views.route("/projects/<project_id>/members", methods=["GET"])
@auth_guard(["admin"])
def get_members(project_id):
    """get all members"""
    return jsonify({"message": "Not implemented"}), 501


@app_views.route("/projects/<project_id>/members/<user_id>", methods=["DELETE"])
@auth_guard(["admin"])
def delete_member(project_id, user_id):
    """delete member"""
    return jsonify({"message": "Not implemented"}), 501


@app_views.route("/members/<user_id>", methods=["GET"])
@auth_guard(["admin"])
def get_projects_by_member(user_id):
    """get projects by member"""
    return jsonify({"message": "Not implemented"}), 501