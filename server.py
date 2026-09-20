from fastapi import FastAPI
from pydantic import BaseModel
from main import shorten_link
from database import connect_db, load_data

class ShortenRequest(BaseModel):
    url: str
    length: int

app = FastAPI()
connect_db()

@app.get("/")
def home():
    response = "Welcome to Dwarf API."
    return response

@app.post("/shorten")
def shorten(request: ShortenRequest):
    short_id = shorten_link(request.url, request.length)

    response = f"https://dwarf.com/{short_id}"
    return response

@app.get("/load")
def load():
    return load_data()