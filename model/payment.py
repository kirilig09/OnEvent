from database import SQLite

class Payment():

    def __init__(self, id, company_id, event_id, status):
        self.id = id
        self.content = content
        self.company_id = company_id
        self.event_id = event_id
        self.status = status

    def to_dict(self):
        message_data = self.__dict__
        return message_data



    @staticmethod
    def make_payment(company_id, event_id):
        result = None
        query = "INSERT INTO payments {} VALUES {}"
        args = (event_id, company_id)
        query = query.format("(event_id, company_id)", args)
        print(query)
        with SQLite() as db:
            result = db.execute(query)



    @staticmethod
    def check_for_payment(event_id, company_id):
        result = None
        with SQLite() as db:
            result = db.execute("SELECT id FROM payments WHERE event_id = ? AND company_id = ?",
                    (event_id, company_id)).fetchone()
        if result is None:
            return False
        else:
            return True



    @staticmethod
    def all_for_event(event_id):
        with SQLite() as db:
            result = db.execute("SELECT * FROM payments WHERE event_id = ?",
                    (event_id,)).fetchall()
        return [Payment(*row).to_dict() for row in result]    
    
    @staticmethod
    def all():
        with SQLite() as db:
            result = db.execute("SELECT * FROM payments").fetchall()
        return [Payment(*row).to_dict() for row in result]