import sqlite3

def connect_db():

    conn = sqlite3.connect("data.db")

    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS code_link(
            short_id text,
            url text
        )
    """)

    conn.commit()
    conn.close()

    print("connection intialized.")

def push_data(short_id: str, url: str):
    conn = sqlite3.connect("data.db")

    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO code_link (short_id, url) VALUES
            (?, ?)
    """, (short_id, url))

    conn.commit()
    conn.close()

    print("data pushed.")

def load_data():
    conn = sqlite3.connect("data.db")

    cursor = conn.cursor()

    cursor.execute("""
        SELECT * FROM code_link
    """)

    data = cursor.fetchall()

    conn.close()

    return data