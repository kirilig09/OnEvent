from database import SQLite

class Message():

    def __init__(self, id, content, sender_id, company_id):
        self.id = id
        self.content = content
        self.sender_id = sender_id
        self.company_id = company_id

    def to_dict(self):
        message_data = self.__dict__
        return message_data



    @staticmethod
    def send_message(content, sender_id, company_id):
        result = None
        query = "INSERT INTO messages {} VALUES {}"
        args = (content, sender_id, company_id)
        query = query.format("(content, sender_id, company_id)", args)
        print(query)
        with SQLite() as db:
            result = db.execute(query)



    @staticmethod
    def load_messages_for(company_id):
        result = None
        with SQLite() as db:
            result = db.execute("SELECT * FROM messages WHERE company_id = ?",
                    (company_id,)).fetchall()
        return [Message(*row).to_dict() for row in result]