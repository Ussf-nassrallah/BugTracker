#!/usr/bin/python3
"""get and create projects module"""
from api.v1.views import app_views
from flask import jsonify, abort, request
from models import storage
from models.project import Project


@app_views.route('/projects', methods=['POST'])
def create_project():
    """create project"""
    name = request.json.get('name')
    description = request.json.get('description')
    created_by = request.json.get('created_by')
    if not name or not description or not created_by:
        return jsonify({"message": "Missing data", "status": 400}), 400
    new_project = Project(name=name, description=description, created_by=created_by)
    storage.new(new_project)
    storage.save()
    return jsonify(new_project.to_dict()), 201


@app_views.route('/projects', methods=['GET'])
def get_projects():
    """get all projects"""
    projects = storage.all(Project)
    projects_list = []
    for project in projects.values():
        projects_list.append(project.to_dict())
    return jsonify(projects_list), 200


@app_views.route('/projects/<project_id>', methods=['GET'])
def get_project_by_id(project_id):
    """get project by id"""
    project = storage.get(Project, project_id)
    if project is None:
        abort(404)
    return jsonify(project.to_dict()), 200
