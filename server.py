from fastapi import FastAPI
from pydantic import BaseModel
from main import shorten_link, fetch_link

class shorten_request(BaseModel):
    link: str
    length: int

app = FastAPI()

@app.get("/")
def home():
    response = "Welcome to Dwarf API."
    return response

@app.post("/shorten")
def shorten(request: shorten_request):
    short_id = shorten_link(request.link, request.length)

    response = f"https://dwarf.com/{short_id}"
    return response

@app.get("/fetch/{short_id}")
def fetch(short_id: str):
    return fetch_link(short_id)
