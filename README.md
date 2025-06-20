

````md
# 📚 Library Management API

A RESTful API built with **Express.js**, **TypeScript**, and **Mongoose** to manage a collection of books and their borrow records.

## Features

- Add, retrieve, update, and delete books
- Validates book fields (e.g., genre, ISBN uniqueness)
- Track borrow records with quantity and due date
- Borrowed books summary using MongoDB aggregation
- Clean folder structure with TypeScript support
- Environment variable management with `.env`

## Technologies Used

- Node.js
- Express.js
- TypeScript
- MongoDB (Mongoose)
- dotenv
- nodemon / ts-node-dev (for development)

## Installation

```bash
git clone https://github.com/mdshamim125/L2-B5-A3-with-express-typescript-mongoose.git
cd L2-B5-A3-with-express-typescript-mongoose
npm install
````

## Environment Variables

Create a `.env` file in the root folder with the following:

```env
PORT=5000
MONGODB_URI=mongodb_url
```

## Running the Server

### Development Mode (with auto-reload):

```bash
npm run dev
```

### Production Build:

```bash
npm run build
npm start
```

## API Endpoints

### Books

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| GET    | `/api/books`     | Get all books     |
| POST   | `/api/books`     | Create a new book |
| GET    | `/api/books/:id` | Get book by ID    |
| PATCH  | `/api/books/:id` | Update a book     |
| DELETE | `/api/books/:id` | Delete a book     |

**Book Schema:**

```json
{
  "title": "string",
  "author": "string",
  "genre": "FICTION | NON_FICTION | SCIENCE | HISTORY | BIOGRAPHY | FANTASY",
  "isbn": "string",
  "description": "string",
  "copies": 5,
  "available": true
}
```

### Borrows

| Method | Endpoint      | Description                |
| ------ | ------------- | -------------------------- |
| POST   | `/api/borrow` | Create a borrow record     |
| GET    | `/api/borrow` | Get borrowed books summary |

**Borrow Schema:**

```json
{
  "book": "ObjectId",
  "quantity": 2,
  "dueDate": "2024-06-30"
}
```

## Borrowed Books Summary

**GET** `/api/borrow`

Returns total quantity borrowed per book:

```json
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    },
    {
      "book": {
        "title": "1984",
        "isbn": "9780451524935"
      },
      "totalQuantity": 3
    }
  ]
}
```

## Scripts

| Command         | Description             |
| --------------- | ----------------------- |
| `npm run dev`   | Run in development mode |
| `npm run build` | Compile TypeScript      |
| `npm start`     | Run compiled JavaScript |

## Project Structure

```
src/
│
├── controllers/
├── models/
├── interfaces/
├── routes/
├── config/
├── app.ts
└── server.ts
```

