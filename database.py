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