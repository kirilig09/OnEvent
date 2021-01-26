from database import SQLite

class Event():

    def __init__(self, id, name, participants, visitors):
        self.id = id
        self.name = name
        self.participants = participants
        self.visitors = visitors

    def to_dict(self):
        event_data = self.__dict__
        return event_data

    # def save(self):
    #     with SQLite() as db:
    #         cursor = db.execute(self.__get_save_query())
    #         self.id = cursor.lastrowid
    #     return self


    def create(name):
        result = None
        query = "INSERT INTO events {} VALUES {}"
        args = (name, 0, 0)
        query = query.format("(name, participants, visitors)", args)
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
        with SQLit() as db:
            count = db.execute("SELECT COUNT(id) FROM users WHERE event_id = ? AND role = ?",
                    (event_id, "visitor")).fetchone()
            result = db.execute("UPDATE events SET visitors = ? WHERE id = ?",
                    (count[0], event_id))

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