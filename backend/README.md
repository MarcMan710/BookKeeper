# BookKeeper Backend

This is the backend server for the BookKeeper application, built with Node.js, Express, and SQLite.

## Features

- RESTful API for managing books
- SQLite database for data persistence
- CORS enabled for frontend integration
- Input validation
- Error handling

## API Endpoints

- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get a single book by ID
- `POST /api/books` - Create a new book
- `PUT /api/books/:id` - Update a book
- `DELETE /api/books/:id` - Delete a book

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create the data directory:
```bash
mkdir data
```

3. Start the development server:
```bash
npm run dev
```

The server will start on port 3000 by default. You can change this by setting the `PORT` environment variable.

## Database

The application uses SQLite as its database. The database file will be automatically created in the `data` directory when you first run the application.

## Development

- `npm run dev` - Start the development server with hot reload
- `npm start` - Start the production server 