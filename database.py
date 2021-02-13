import sqlite3 as sqlite


DB_NAME = "main.db"

conn = sqlite.connect(DB_NAME)

conn.cursor().execute('''
CREATE TABLE IF NOT EXISTS events
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        participants INT,
        visitors INT,
        status TEXT NOT NULL
    )
''')
conn.commit()

conn.cursor().execute('''
CREATE TABLE IF NOT EXISTS users
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        event_id INTEGER,
        company_id INTEGER,
        FOREIGN KEY(event_id) REFERENCES events(id),
        FOREIGN KEY(company_id) REFERENCES companies(id)
    )
''')
conn.commit()

conn.cursor().execute('''
CREATE TABLE IF NOT EXISTS companies
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        password TEXT NOT NULL,
        image_link TEXT,
        event_id INTEGER,
        FOREIGN KEY(event_id) REFERENCES events(id)
    )
''')
conn.commit()

conn.cursor().execute('''
CREATE TABLE IF NOT EXISTS messages
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content TEXT NOT NULL,
        sender_id INTEGER,
        company_id INTEGER,
        FOREIGN KEY(sender_id) REFERENCES users(id),
        FOREIGN KEY(company_id) REFERENCES companies(id)
    )
''')
conn.commit()

class SQLite(object):

    def __enter__(self):
        self.conn = sqlite.connect(DB_NAME)
        return self.conn.cursor()

    def __exit__(self, type, value, traceback):
        self.conn.commit()