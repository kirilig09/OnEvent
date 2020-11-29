import sqlite3 as sqlite


DB_NAME = "main.db"

conn = sqlite.connect(DB_NAME)

conn.cursor().execute('''
CREATE TABLE IF NOT EXISTS events
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE
    )
''')
conn.commit()


class SQLite(object):

    def __enter__(self):
        self.conn = sqlite.connect(DB_NAME)
        return self.conn.cursor()

    def __exit__(self, type, value, traceback):
        self.conn.commit()