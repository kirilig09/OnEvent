from database import SQLite
from flask_login import UserMixin

class User(UserMixin):

    def __init__(self, name, password, role, event=None):
        self.name = name
        self.password = password

        possibleRoles = ("admin", "participant", "visitor")
        if role in possibleRoles:
            self.role = role
        
        self.event = event

    def to_dict(self):
        event_data = self.__dict__
        return event_data

    # def save(self):
    #     with SQLite() as db:
    #         cursor = db.execute(self.__get_save_query())
    #         self.id = cursor.lastrowid
    #     return self


    def registerVisitor(name, password, role):
        result = None
        query = "INSERT INTO users {} VALUES {}"
        args = (name, password, role)
        query = query.format("(name, password, role)", args)
        print(query)
        with SQLite() as db:
            result = db.execute(query)

    def registerParticipant(name, password, role, event):
        result = None
        query = "INSERT INTO users {} VALUES {}"
        args = (name, password, role, event)
        query = query.format("(name, password, role, event_id)", args)
        print(query)
        with SQLite() as db:
            result = db.execute(query)

    @staticmethod
    def all():
        with SQLite() as db:
            result = db.execute(
                    "SELECT * FROM users").fetchall()
        return [User(*row).to_dict() for row in result]

    def get_admins():
        with SQLite() as db:
            result = db.execute(
                    "SELECT * FROM users WHERE role = 'admin'").fetchall()
        return [User(*row).to_dict() for row in result]

    def get_all_participants():
        with SQLite() as db:
            result = db.execute(
                    "SELECT * FROM users WHERE role = 'participant'").fetchall()
        return [User(*row).to_dict() for row in result]

    def get_all_visitors():
        with SQLite() as db:
            result = db.execute(
                    "SELECT * FROM users WHERE role = 'visitor'").fetchall()
        return [User(*row).to_dict() for row in result]

    # @staticmethod
    # def __get_save_query(self):
    #     query = "{} INTO events {} VALUES {}"
    #     # if self.id == None:
    #     #     args = (self.name)                                   - we use create() in this scenario
    #     #     query = query.format("INSERT", "(name)", args)
    #     # else:
    #         args = (self.id, self.name)
    #         query = query.format("REPLACE", "(id, name)", args)
    #     return query