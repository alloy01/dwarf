from fastapi import FastAPI
from pydantic import BaseModel
from main import shorten_url, fetch_url
from database import connect_db

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
    short_id = shorten_url(request.url, request.length)

    response = f"https://dwarf.com/{short_id}"
    return response

@app.get("/fetch/{short_id}")
def load(short_id: str):
    return fetch_url(short_id)