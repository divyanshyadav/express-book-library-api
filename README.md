# Book Library APIs

Book library REST API server created using express.

## Endpoints

#### `GET /api/books`

List all books

#### `GET /api/books?search={name/author}`

Search book(s) by name/author.

#### `GET /api/books/{id}`

Get a book by id.

#### `POST /api/books`

Create a new book.

#### `PUT /api/books/{id}`

Update a book by id.

#### `DELETE /api/books/{id}`

Delete a book by id.

## Getting started

Run the below command to install all the project dependencies.

### `npm install`

Then you can run:

### `npm start`

Which runs the server on port 5000.
