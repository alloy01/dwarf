import string
import random
import json

def gen_id(length: int) -> str:
    salt = string.ascii_letters + string.digits
    draft_id = ''.join(random.choices(salt, k=length))
    return draft_id

def load_data() -> dict:
    with open('data.json', 'r') as file:
        data = json.load(file)

        return data

def shorten_link(link: str, length: int) -> str:
    duped_id = True

    short_id = ''

    while duped_id == True:
        draft_id = gen_id(length)

        data = load_data()
        for line in data:
            if line == draft_id:
                break
        else:
            duped_id = False
            short_id = draft_id

    data[short_id] = link

    with open('data.json', 'w') as file:
        json.dump(data, file, indent=4)

    return short_id
