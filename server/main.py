import string
import random
from server.database import push_data, load_data

def gen_id(length: int) -> str:
    salt = string.ascii_letters + string.digits
    draft_id = "".join(random.choices(salt, k=length))
    return draft_id

def shorten_url(url: str, length: int) -> str:
    is_duped = True

    short_id = ""

    while is_duped:
        draft_id = gen_id(length)

        data = load_data()

        for i in range(len(data)):
            if data[i][0] == draft_id:
                break
        else:
            is_duped = False
            short_id = draft_id

    push_data(short_id, url)

    return draft_id

def fetch_url(short_id: str):
    data = load_data()
    url = "invalid short id"

    for i in range(len(data)):
        if data[i][0] == short_id:
            url = data[i][1]

    return url