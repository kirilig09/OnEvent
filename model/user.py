from database import SQLite
from flask_login import UserMixin

class User(UserMixin):

    def __init__(self, id, name, password, role, email, event, company):
        self.id = id
        self.name = name
        self.password = password
        self.role = role
        self.email = email
        self.event = event
        self.company = company

    def to_dict(self):
        user_data = self.__dict__
        return user_data



    @staticmethod
    def find(user_id):
        result = None
        with SQLite() as db:
            result = db.execute(
                    "SELECT * FROM users WHERE id = ?",
                    (user_id,))
        user = result.fetchone()
        if user is None:
            return None
        return User(*user)

    @staticmethod
    def find_by_name(name):
        result = None
        with SQLite() as db:
            result = db.execute(
                "SELECT * FROM users WHERE name = ?",
                (name,)
            )
        user = result.fetchone()
        if user is None:
            raise ApplicationError(
                    "User with name {} not found".format(name), 404)
        return User(*user)

    @staticmethod
    def find_for_login(name, password):
        result = None
        with SQLite() as db:
            result = db.execute(
                "SELECT * FROM users WHERE name = ? AND password = ?",
                (name, password)
            )
        user = result.fetchone()
        if user is None:
            raise ApplicationError(
                    "User with name {} not found".format(name), 404)
        return User(*user)

    @staticmethod
    def find_company_id(user_id):
        result = None
        with SQLite() as db:
            result = db.execute("SELECT company_id FROM users WHERE id = ?",
            (user_id,)).fetchone()
        return result[0]



    @staticmethod
    def registerAdmin(name, password, email):
        result = None
        query = "INSERT INTO users {} VALUES {}"
        args = (name, password, "admin", email)
        query = query.format("(name, password, role, email)", args)
        print(query)
        with SQLite() as db:
            result = db.execute(query)

    @staticmethod
    def registerVisitor(name, password, email):
        result = None
        query = "INSERT INTO users {} VALUES {}"
        args = (name, password, "visitor", email)
        query = query.format("(name, password, role, email)", args)
        print(query)
        with SQLite() as db:
            result = db.execute(query)

    @staticmethod
    def registerParticipant(name, password, email, event, c_id):
        result = None
        query = "INSERT INTO users {} VALUES {}"
        args = (name, password, "participant", email, event, c_id)
        query = query.format("(name, password, role, email, event_id, company_id)", args)
        print(query)
        with SQLite() as db:
            result = db.execute(query)

    @staticmethod
    def bind_company(user_id, company_id):
        result = None
        with SQLite() as db:
            result = db.execute("UPDATE users SET company_id = ? WHERE id = ?",
                (company_id, user_id))

    @staticmethod
    def join_event(user_id, event_id):
        result = None
        with SQLite() as db:
            result = db.execute("UPDATE users SET event_id = ? WHERE id =?",
                (event_id, user_id))



    @staticmethod
    def all():
        with SQLite() as db:
            result = db.execute(
                    "SELECT * FROM users").fetchall()
        return [User(*row).to_dict() for row in result]

    @staticmethod
    def get_admins():
        with SQLite() as db:
            result = db.execute(
                    "SELECT * FROM users WHERE role = 'admin'").fetchall()
        return [User(*row).to_dict() for row in result]

    @staticmethod
    def get_all_participants():
        with SQLite() as db:
            result = db.execute(
                    "SELECT * FROM users WHERE role = 'participant'").fetchall()
        return [User(*row).to_dict() for row in result]

    @staticmethod
    def get_participants_sp(event_id):
        result = None
        with SQLite() as db:
            result = db.execute("SELECT * FROM users WHERE event_id = ? AND role = ?",
                    (event_id, "participant")).fetchall()
        return [User(*row).to_dict() for row in result]

    @staticmethod
    def get_all_visitors():
        with SQLite() as db:
            result = db.execute(
                    "SELECT * FROM users WHERE role = 'visitor'").fetchall()
        return [User(*row).to_dict() for row in result]

    @staticmethod
    def get_visitors_sp(event_id):
        result = None
        with SQLite() as db:
            result = db.execute("SELECT * FROM users WHERE event_id = ? AND role = ?",
                    (event_id, "visitor")).fetchall()
        return [User(*row).to_dict() for row in result]

    @staticmethod
    def count_visitors_sp(event_id):
        result = None
        with SQLite() as db:
            result = db.execute("SELECT COUNT(id) FROM users WHERE event_id = ? AND role = ?",
                    (event_id, "visitor")).fetchone()
        return result[0]