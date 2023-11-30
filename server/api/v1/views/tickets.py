#!/usr/bin/python3
"""get and create tickets module"""
from datetime import datetime
from api.v1.views import app_views
from flask import jsonify, abort, request
from models import storage
from models.ticket import Ticket


@app_views.route("/tickets", methods=["POST"])
def create_ticket():
    """create ticket"""
    title = request.json.get("title")
    description = request.json.get("description")
    created_by = request.json.get("created_by")
    parent_id = request.json.get("parent_id")
    ticket_type = request.json.get("ticket_type")
    status = request.json.get("status")
    if not title or not description or not status or not created_by or not parent_id:
        return jsonify({"message": "Missing data", "status": 400}), 400
    new_ticket = Ticket(
        title=title,
        description=description,
        created_by=created_by,
        parent_id=parent_id,
        status=status,
        ticket_type=ticket_type,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
    )
    storage.new(new_ticket)
    storage.save()
    return jsonify({"message": "ticket created successfully", "status": 201, "ticket": new_ticket.as_dict()}), 201


@app_views.route("/tickets", methods=["GET"])
def get_tickets():
    """get all tickets"""
    tickets = storage.all(Ticket)
    tickets_list = []
    for ticket in tickets.values():
        tickets_list.append(ticket.as_dict())
    return jsonify(tickets_list), 200


@app_views.route("/tickets/<ticket_id>", methods=["GET"])
def get_ticket_by_id(ticket_id):
    """get ticket by id"""
    ticket = storage.get(Ticket, ticket_id)
    if ticket is None:
        abort(404)
    return jsonify(ticket.as_dict()), 200


@app_views.route("/tickets/<ticket_id>", methods=["PUT"])
def update_ticket(ticket_id):
    """update ticket information"""
    ticket = storage.get(Ticket, ticket_id)
    # print(ticket)
    if ticket is None:
        abort(404)
    if not request.json:
        abort(400, description="Not a JSON")
    for key, value in request.json.items():
        if key not in ["id", "created_at", "updated_at", "created_by", "parent_id"]:
            setattr(ticket, key, value)
    ticket.updated_at = datetime.utcnow()
    storage.save()
    return jsonify(ticket.as_dict()), 200


@app_views.route("/tickets/<ticket_id>", methods=["DELETE"])
def delete_ticket(ticket_id):
    """delete ticket"""
    ticket = storage.get(Ticket, ticket_id)
    if ticket is None:
        abort(404)
    storage.delete(ticket)
    storage.save()
    return jsonify({"message": "Ticket deleted", "status": 202}), 202
