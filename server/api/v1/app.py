#!/usr/bin/python3
""" Entry point of the API """
from flask import Flask
from flask_migrate import Migrate
from api.v1.views import app_views
from models import storage
from api.v1.extensions import db
from flask_cors import CORS


app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
app.register_blueprint(app_views)
# CREATE USER 'ussef'@'localhost' IDENTIFIED BY 'Lacrim2017';
# GRANT ALL PRIVILEGES ON *.* TO 'ussef'@'localhost' WITH GRANT OPTION;
# FLUSH PRIVILEGES;
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://root:43211234@localhost/orm_db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)
migrate = Migrate(app, db)


@app.teardown_appcontext
def teardown_appcontext(exception):
    """Teardown app context"""
    storage.close()


def create_tables():
    """Create database tables"""
    with app.app_context():
        db.create_all()


if __name__ == "__main__":
    create_tables()
    app.run(debug=True)
