# Phonebook Server

A simple REST API server for managing a phonebook with Express.js. This server provides CRUD operations for managing contacts with names and phone numbers.

## 🌐 Live Demo

**Try the application online**: [https://fso-phonebook-8zni.onrender.com](https://fso-phonebook-8zni.onrender.com)

## Features

- RESTful API for phonebook management
- CORS enabled for cross-origin requests
- Request logging with Morgan
- JSON request/response handling
- In-memory data storage
- Input validation for required fields
- Unique name constraint

## Prerequisites

- Node.js (version 18 or higher recommended)
- npm or yarn package manager

## Installation

1. Clone or download the project
2. Navigate to the server directory
3. Install dependencies:

```bash
npm install
```

## Usage

### Development Mode
Start the server with auto-restart on file changes:
```bash
npm run dev
```

### Production Mode
Start the server:
```bash
npm start
```

The server will run on port 3001 by default, or use the PORT environment variable if set.

## API Endpoints

### Get Phonebook Info
- **GET** `/info`
- Returns basic information about the phonebook
- **Response**: HTML page showing total number of contacts and current date

### Get All Persons
- **GET** `/api/persons`
- Returns all contacts in the phonebook
- **Response**: JSON array of person objects

```json
[
  {
    "id": "1",
    "name": "Arto Hellas",
    "number": "040-123456"
  }
]
```

### Get Single Person
- **GET** `/api/persons/:id`
- Returns a specific contact by ID
- **Parameters**: `id` - The person's ID
- **Response**: JSON person object or 404 if not found

### Create New Person
- **POST** `/api/persons`
- Creates a new contact
- **Request Body**:
```json
{
  "name": "John Doe",
  "number": "123-456-7890"
}
```
- **Validation**:
  - Name is required
  - Number is required
  - Name must be unique
- **Response**: Created person object with generated ID

### Delete Person
- **DELETE** `/api/persons/:id`
- Deletes a contact by ID
- **Parameters**: `id` - The person's ID
- **Response**: 204 No Content

## Dependencies

- **express**: Web framework for Node.js
- **cors**: Enable CORS (Cross-Origin Resource Sharing)
- **morgan**: HTTP request logger middleware

## Error Handling

The API returns appropriate HTTP status codes:
- `200` - Success
- `204` - No Content (successful deletion)
- `400` - Bad Request (validation errors)
- `404` - Not Found (person doesn't exist)

## Sample Data

The server starts with 4 sample contacts:
- Arto Hellas: 040-123456
- Ada Lovelace: 39-44-5323523
- Dan Abramov: 12-43-234345
- Mary Poppendieck: 39-23-6423122
