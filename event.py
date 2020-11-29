from database import SQLite

class Event():

    def __init__(self, name):
        self.name = name

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
        query = "INSERT INTO events {} VALUES ('{}')"
        args = (name)
        query = query.format("(name)", args)
        print(query)
        with SQLite() as db:
            result = db.execute(query)

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
        return [User(*row) for row in result]

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