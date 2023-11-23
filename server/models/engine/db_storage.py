#!/usr/bin/python3
"""
Contains the class DBStorage
"""
from models.user import User
from models.project import Project
from models.member import Member
from models.ticket import Ticket
from api.v1.extensions import db

classes = {"User": User, "Project": Project, "Member": Member, "Ticket": Ticket}


class DBStorage:
    """interaacts with the MySQL database"""

    def all(self, cls=None):
        """query on the current database session"""
        new_dict = {}
        for clss in classes:
            if cls is None or cls is classes[clss] or cls is clss:
                objs = db.session.query(classes[clss]).all()
                for obj in objs:
                    key = obj.__class__.__name__ + "." + obj.id
                    new_dict[key] = obj
        return new_dict

    def new(self, obj):
        """add the object to the current database session"""
        db.session.add(obj)

    def save(self):
        """commit all changes of the current database session"""
        db.session.commit()

    def delete(self, obj=None):
        """delete from the current database session obj if not None"""
        if obj is not None:
            db.session.delete(obj)

    def close(self):
        """call remove() method on the private session attribute"""
        db.session.remove()

    def get(self, cls, id):
        """A method to retrieve one object"""
        if cls and id:
            objs = self.all(cls)
            for obj in objs.values():
                if obj.id == id:
                    return obj
        return None

    def count(self, cls=None):
        """A method to count the number of objects in storage"""
        if cls:
            return len(self.all(cls))
        else:
            return len(self.all())

    def get_by_email(self, email):
        """A method to retrieve one object"""
        return db.session.query(User).filter(User.email == email).first()
