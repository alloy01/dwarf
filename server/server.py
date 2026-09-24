from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.responses import RedirectResponse
from server.main import shorten_url, fetch_url
from server.database import connect_db

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

@app.get("/{short_id}")
def load(short_id: str):
    url = fetch_url(short_id)

    if url == None:
        raise HTTPException(status_code=404, detail="short url not found.")

    return RedirectResponse(url, status_code=302)