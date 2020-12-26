from database import SQLite

class Visitor():

    def __init__(self, name, password):
        self.name = name
        self.password = password

    def to_dict(self):
        event_data = self.__dict__
        return event_data

    # def save(self):
    #     with SQLite() as db:
    #         cursor = db.execute(self.__get_save_query())
    #         self.id = cursor.lastrowid
    #     return self


    def register(name, password):
        result = None
        query = "INSERT INTO visitors {} VALUES {}"
        args = (name, password)
        query = query.format("(name, password)", args)
        print(query)
        with SQLite() as db:
            result = db.execute(query)

    @staticmethod
    def all():
        with SQLite() as db:
            result = db.execute(
                    "SELECT name, password FROM visitors").fetchall()
        return [Visitor(*row).to_dict() for row in result]

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