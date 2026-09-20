import string
import random
from database import push_data

def gen_id(length: int) -> str:
    salt = string.ascii_letters + string.digits
    draft_id = "".join(random.choices(salt, k=length))
    return draft_id

def shorten_link(url: str, length: int) -> str:
    draft_id = gen_id(length)

    push_data(draft_id, url)

    return draft_id
    