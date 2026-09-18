from fastapi import FastAPI
from pydantic import BaseModel
import string
import json
import random

class shorten_request(BaseModel):
    link: str
    length: int

app = FastAPI()

@app.get("/")
def home():
    data = "Welcome to Dwarf API"
    return data

@app.post("/shorten")
def shorten(request: shorten_request):
    salt = string.ascii_letters + string.digits
    short_id = "".join(random.choices(salt, k=request.length))

    with open("data.json", "r") as file:
        data = json.load(file)

    data[short_id] = request.link

    with open("data.json", "w") as file:
        json.dump(data, file, indent=4)

    return f"https://dwarf.com/{short_id}"