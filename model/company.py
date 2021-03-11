from database import SQLite

class Company():

    def __init__(self, id, name, password, image_link, event_id):
        self.id = id
        self.name = name
        self.password = password
        self.image_link = image_link
        self.event_id = event_id

    def to_dict(self):
        company_data = self.__dict__
        return company_data



    @staticmethod
    def register(name, password, image_link, event_id):
        result = None
        query = "INSERT INTO companies {} VALUES {}"
        args = (name, password, image_link, event_id)
        query = query.format("(name, password, image_link, event_id)", args)
        print(query)
        with SQLite() as db:
            result = db.execute(query)



    @staticmethod
    def find(id):
        result = None
        with SQLite() as db:
            result = db.execute("SELECT * FROM companies WHERE id = ?",
                    (id,)).fetchone()
        return Company(*result)

    @staticmethod
    def find_id(name, password, event_id):
        result = None
        with SQLite() as db:
            result = db.execute("SELECT id FROM companies WHERE name = ? AND password = ? AND event_id = ?",
                (name, password, event_id)).fetchone()
        if result is None:
            raise ApplicationError(
                    "False company credentials", 404)
        return result[0]


    
    @staticmethod
    def get_companies_sp(event_id):
        result = None
        with SQLite() as db:
            result = db.execute("SELECT * FROM companies WHERE event_id = ?",
                    (event_id,)).fetchall()
        return [Company(*row).to_dict() for row in result]

    @staticmethod
    def get_companies_sp_list(event_id):
        result = None
        with SQLite() as db:
            result = db.execute("SELECT * FROM companies WHERE event_id = ?",
                    (event_id,)).fetchall()
        return [Company(*row) for row in result]

    @staticmethod
    def get_company(company_id):
        result = None
        with SQLite() as db:
            result = db.execute("SELECT * FROM companies WHERE id = ?",
            (company_id,))
        company = result.fetchone()
        return Company(*company)



    @staticmethod
    def change_image(company_id, new_image):
        result = None
        with SQLite() as db:
            result = db.execute("UPDATE companies SET image_link = ? WHERE id = ?",
                    (new_image, company_id))