from database import SQLite
from flask_login import UserMixin

class User(UserMixin):

    def __init__(self, id, name, password, role, event, company):
        self.id = id
        self.name = name
        self.password = password
        self.role = role
        self.event = event
        self.company = company

        possibleRoles = ("admin", "participant", "visitor")
        if role in possibleRoles:
            self.role = role

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



    def registerAdmin(name, password):
        result = None
        query = "INSERT INTO users {} VALUES {}"
        args = (name, password, "admin")
        query = query.format("(name, password, role)", args)
        print(query)
        with SQLite() as db:
            result = db.execute(query)

    def registerVisitor(name, password):
        result = None
        query = "INSERT INTO users {} VALUES {}"
        args = (name, password, "visitor")
        query = query.format("(name, password, role)", args)
        print(query)
        with SQLite() as db:
            result = db.execute(query)

    def registerParticipant(name, password, event, c_id):
        result = None
        query = "INSERT INTO users {} VALUES {}"
        args = (name, password, "participant", event, c_id)
        query = query.format("(name, password, role, event_id, company_id)", args)
        print(query)
        with SQLite() as db:
            result = db.execute(query)

    def bind_company(user_id, company_id):
        result = None
        with SQLite() as db:
            result = db.execute("UPDATE users SET company_id = ? WHERE id = ?",
                (company_id, user_id))



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

    def get_participants_sp(event_id):
        result = None
        with SQLite() as db:
            result = db.execute("SELECT * FROM users WHERE event_id = ?",
                    (event_id,)).fetchall()
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