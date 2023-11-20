#!/usr/bin/python3
"""get and create tickets module"""
from api.v1.views import app_views
from flask import jsonify, abort, request
from models import storage
from models.ticket import Ticket


@app_views.route('/tickets', methods=['POST'])
def create_ticket():
    """create ticket"""
    title = request.json.get('title')
    description = request.json.get('description')
    created_by = request.json.get('created_by')
    parent_id = request.json.get('parent_id')
    ticket_type = request.json.get('ticket_type')
    if not title or not description or not created_by or not parent_id:
        return jsonify({"message": "Missing data", "status": 400}), 400
    new_ticket = Ticket(title=title, description=description, created_by=created_by, parent_id=parent_id, ticket_type=ticket_type)
    storage.new(new_ticket)
    storage.save()
    return jsonify(new_ticket.to_dict()), 201