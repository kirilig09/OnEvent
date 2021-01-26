from database import SQLite

class Company():

    def __init__(self, id, name, event):
        self.id = id
        self.name = name
        self. event = event

    def to_dict(self):
        event_data = self.__dict__
        return event_data

    @staticmethod
    def register(name, event):
        result = None
        query = "INSERT INTO companies {} VALUES {}"
        args = (name, event)
        query = query.format("(name, event_id)", args)
        print(query)
        with SQLite() as db:
            result = db.execute(query)