#!/usr/bin/python3
""" Entry point of the API """
from flask import Flask
from api.v1.views import app_views
from models import storage


app = Flask(__name__)
app.register_blueprint(app_views)

@app.teardown_appcontext
def teardown_appcontext(exception):
    """ Teardown app context """
    storage.close()

if __name__ == '__main__':
    app.run(debug=True)