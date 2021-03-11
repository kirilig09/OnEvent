from database import SQLite

class Event():

    def __init__(self, id, name, participants, visitors, status, subscriptable, payment):
        self.id = id
        self.name = name
        self.participants = participants
        self.visitors = visitors
        self.status = status
        self.subscriptable = subscriptable
        self.payment = payment

    def to_dict(self):
        event_data = self.__dict__
        return event_data

    # def save(self):
    #     with SQLite() as db:
    #         cursor = db.execute(self.__get_save_query())
    #         self.id = cursor.lastrowid
    #     return self


    @staticmethod
    def create(name):
        result = None
        query = "INSERT INTO events {} VALUES {}"
        args = (name, 0, 0, "active", False)
        query = query.format("(name, participants, visitors, status, subscriptable)", args)
        print(query)
        with SQLite() as db:
            result = db.execute(query)

    @staticmethod
    def create_subscriptable(name, payment):
        result = None
        query = "INSERT INTO events {} VALUES {}"
        args = (name, 0, 0, "active", True, payment)
        query = query.format("(name, participants, visitors, status, subscriptable, payment)", args)
        print(query)
        with SQLite() as db:
            result = db.execute(query)

    @staticmethod
    def add_participant(event_id):
        count = None
        result = None
        with SQLite() as db:
            count = db.execute("SELECT COUNT(id) FROM users WHERE event_id = ? AND role = ?",
                    (event_id, "participant")).fetchone()
            result = db.execute("UPDATE events SET participants = ? WHERE id = ?",
                    (count[0], event_id))

    @staticmethod
    def add_visitor(event_id):
        result = None
        count = None
        with SQLite() as db:
            count = db.execute("SELECT COUNT(visitors) FROM events WHERE id = ?",
                    (event_id,)).fetchone()
            result = db.execute("UPDATE events SET visitors = ? WHERE id = ?",
                    (count[0], event_id))

    @staticmethod
    def update_visitors(event_id, count):
        result = None
        with SQLite() as db:
            result = db.execute("UPDATE events SET visitors = ? WHERE id = ?",
                (count, event_id))



    @staticmethod
    def find(event_id):
        result = None
        with SQLite() as db:
            result = db.execute("SELECT * FROM events WHERE id = ?",
                (event_id,)).fetchone()
        print(result)
        return Event(*result) 

    @staticmethod
    def deactivate(event_id):
        with SQLite() as db:
            result = db.execute("UPDATE events SET status = ? WHERE id = ?",
                    ("inactive", event_id))



    @staticmethod
    def get_all_active():
        with SQLite() as db:
            result = db.execute("SELECT * FROM events WHERE status = ?",
                    ("active",)).fetchall()
        return [Event(*row).to_dict() for row in result]

    @staticmethod
    def get_all_inactive():
        with SQLite() as db:
            result = db.execute("SELECT * FROM events WHERE status = ?",
                    ("inactive",)).fetchall()
        return [Event(*row).to_dict() for row in result]

    @staticmethod
    def all_names():
        with SQLite() as db:
            result = db.execute(
                    "SELECT name FROM events").fetchall()
        return [''.join(event_name) for event_name in result]

    @staticmethod
    def all():
        with SQLite() as db:
            result = db.execute(
                    "SELECT * FROM events").fetchall()
        return [Event(*row).to_dict() for row in result]

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