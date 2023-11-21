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


@app_views.route('/tickets', methods=['GET'])
def get_tickets():
    """get all tickets"""
    tickets = storage.all(Ticket)
    tickets_list = []
    for ticket in tickets.values():
        tickets_list.append(ticket.to_dict())
    return jsonify(tickets_list), 200


@app_views.route('/tickets/<ticket_id>', methods=['GET'])
def get_ticket_by_id(ticket_id):
    """get ticket by id"""
    ticket = storage.get(Ticket, ticket_id)
    if ticket is None:
        abort(404)
    return jsonify(ticket.to_dict()), 200
