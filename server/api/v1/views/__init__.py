#!/usr/bin/python3

""" Blueprint for the API """
from flask import Blueprint

app_views = Blueprint("app_views", __name__, url_prefix="/api/v1")

from api.v1.views.auth import *
from api.v1.views.users import *
from api.v1.views.projects import *
from api.v1.views.tickets import *
from api.v1.views.members import *
