from database import SQLite

class Invite():

    def __init__(self, id, event_id, user_email):
        self.id = id
        self.event_id = event_id
        self.user_email = user_email

    def to_dict(self):
        message_data = self.__dict__
        return message_data



    @staticmethod
    def send_invite(event_id, user_email):
        result = None
        query = "INSERT INTO invites {} VALUES {}"
        args = (event_id, user_email)
        query = query.format("(event_id, user_email)", args)
        print(query)
        with SQLite() as db:
            result = db.execute(query)



    @staticmethod
    def check_for_invite(event_id, user_email):
        result = None
        with SQLite() as db:
            result = db.execute("SELECT id FROM invites WHERE event_id = ? AND user_email = ?",
                    (event_id, user_email)).fetchone()
        if result is None:
            return False
        else:
            return True



    @staticmethod
    def all_for_event(event_id):
        with SQLite() as db:
            result = db.execute("SELECT * FROM invites WHERE event_id = ?",
                    (event_id,)).fetchall()
        return [Invite(*row).to_dict() for row in result]    
    
    @staticmethod
    def all():
        with SQLite() as db:
            result = db.execute("SELECT * FROM invites").fetchall()
        return [Invite(*row).to_dict() for row in result]