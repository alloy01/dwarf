# Dwarf

> A full-stack URL shortener built with Python and FastAPI.

Dwarf is an early-stage full-stack URL shortening project currently under active development.

The project started as a simple Python CLI experiment using SQLite for persistence and is now being developed into a web application with a FastAPI backend and frontend.

## Status

**Early Development 🚧**

The core shortening and fetching functionality is currently implemented. The project is still being expanded and its architecture will evolve as development continues.

## Current Features

* Generate short IDs for URLs
* Store shortened URLs using JSON
* Fetch the original URL using a short ID
* REST API built with FastAPI
* Request validation using Pydantic
* Separate URL-shortening logic from API routes

## Tech Stack

### Backend

* Python
* FastAPI
* Pydantic
* SQLite

### Development

* Postman
* Git
* GitHub

## API

### `GET /`

Returns a simple API welcome message.

### `POST /shorten`

Creates a shortened URL.

#### Request

```json
{
  "link": "https://example.com",
  "length": 7
}
```

#### Response

```text
https://dwarf.com/aB72xKp
```

### `GET /{short_id}`

Fetches the original URL associated with a short ID.

Example:

```text
GET /aB72xKp
```

Response:

```text
https://example.com
```

## Project Structure

The backend currently follows a simple separation between the API layer and the URL-shortening logic:

```text
dwarf/
├── app.py
├── main.py
├── data.db
├── server.py
├── database.py
└── README.md
```

The exact structure may change as the project develops.

## How It Works

The current backend flow is:

```text
Client
  │
  ▼
FastAPI
  │
  ├── /shorten
  │      │
  │      ▼
  │   shorten_link()
  │      │
  │      ▼
  │   data.db (SQLite)
  │
  └── /{short_id}
         │
         ▼
      fetch_link()
         │
         ▼
      data.db (SQLite)
```

A random alphanumeric ID is generated for each URL. The ID and original URL are then stored as a key-value pair in `data.db`.

## Roadmap

Dwarf is still being built. Planned improvements include:

* [ ] PostgreSQL support
* [ ] Actual URL redirection
* [ ] Frontend integration
* [ ] User authentication
* [ ] User-specific URL management
* [ ] URL history
* [ ] Better error handling
* [ ] Production deployment
* [ ] Dockerization

The roadmap is subject to change as the project evolves.

## Development

Clone the repository:

```bash
git clone https://github.com/alloy01/dwarf.git
cd dwarf
```

Create a virtual environment:

```bash
python -m venv .venv
```

Activate it on Windows:

```bash
.venv\Scripts\activate
```

Run the FastAPI development server:

```bash
uvicorn server:app --reload
```

The API will then be available locally.

## Why Dwarf?

Dwarf is primarily a learning project built to understand the progression from a simple Python program to a full-stack application.

The project is being developed incrementally:

```text
Python CLI
    ↓
JSON persistence
    ↓
FastAPI
    ↓
SQLite
    ↓
PostgreSQL
    ↓
Full-stack application
```

Rather than hiding the project's early stages, Dwarf is intentionally being built step by step to understand what happens at each layer.

## Developer

Developed by `alloy01`
