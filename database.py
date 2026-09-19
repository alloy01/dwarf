import sqlite3

def connect_db():

    conn = sqlite3.connect("data.db")

    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS code_link(
            code text,
            link text
        )
    """)

    conn.commit()
    conn.close()

    print("connection intialized.")

def push_data(code: str, url: str):
    conn = sqlite3.connect("data.db")

    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO code_link (code, link) VALUES(
            (?, ?)
        )
    """, (code, url))

    conn.commit()
    conn.close()

    print("data pushed.")

def load_data():
    conn = sqlite3.connect("data.db")

    cursor = conn.cursor()

    cursor.execute("SELECT * FROM code_link")
    print(cursor.fetchall)

    conn.commit()
    conn.close()

    print("data loaded.")