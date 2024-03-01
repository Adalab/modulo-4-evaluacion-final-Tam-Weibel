# modulo-4-evaluacion-final-Tam-Weibel

The exercise consists in creating a REST API that allows for CRUD operation. 

In this proposed solution, Express.js was used for server operation, Node.js for the backend and MySQL for the database.

For the DB design 'music.sql' has been uploaded to the 'bd' folder in the repo with the queries used to create the Music database and the three tables it includes (artists, albums and genre). The relationships between these tables are established through foreign keys, ensuring a well-organized database structure.

5 endpoints have been configured allowing for all CRUD operations to be executed. Please ses below the readme with all necessary documentation.

## Music API

This is a simple API to search for information on albums and artists in the music industry.

### Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Endpoints](#endpoints)
  - [Get Albums](#get-albums)
  - [Add Album](#add-album)
  - [Get Albums by Artist](#get-albums-by-artist)
  - [Update Artist](#update-artist)
  - [Delete Album](#delete-album)

### Installation

1. Clone the repository:
   git clone https://github.com/your-username/music-api.git

2. Install dependencies:
    npm install

3. Set up your database and configure the connection in config.js.

4. Start the server:
    npm start

### Usage
The API is now running on http://localhost:4000.

### API Documentation
For detailed API documentation, you can explore the Swagger Documentation available at http://localhost:4000/api-doc.

### Endpoints

#### Get Albums
Request
- Method: GET
- Endpoint: /getalbums
- Parameters:
genre (optional): Filter albums by genre (case-insensitive).

Responses
- 200 OK:
Successful response with a list of albums.
    {
      "success": true,
      "albums": [...]
    }

- 404 Not Found:
No albums found in the database or in the specified genre.
    {
      "success": false,
      "message": "There are no albums in the database or in the specified genre."
    }

- 500 Internal Server Error:
Something went wrong on the server.
    {
      "success": false,
      "error": "Internal Server Error"
    }

#### Add Album
Request
- Method: POST
- Endpoint: /addalbum
- Request Body:
    Provide data for the new album.
    {
      "album_title": "Album Title",
      "release_year": 2023,
      "artist_name": "Artist Name",
      "origin": "Artist Origin",
      "debut_year": 2010,
      "genre": "Rock"
    }

Responses
- 200 OK:
Album added successfully.
    {
      "success": true,
      "message": "Album added successfully to the database."
    }

- 409 Conflict:
Album already exists in the database.
    {
      "success": false,
      "message": "Album already exists in the database."
    }

- 500 Internal Server Error:
Something went wrong on the server.
    {
      "success": false,
      "error": "Internal Server Error"
    }

#### Get Albums by Artist
Request
- Method: GET
- Endpoint: /byartist
- Parameters:
    artist_name (required): The name of the artist.

Responses
- 200 OK:
Successful response with a list of albums by the specified artist.
    {
      "success": true,
      "albums": [...]
    }

- 404 Not Found:
No albums found by the specified artist.
    {
      "success": false,
      "message": "There are no albums by Artist Name in the database."
    }

- 500 Internal Server Error:
Something went wrong on the server.
    {
      "success": false,
      "error": "Internal Server Error"
    }

#### Update Artist
Request
- Method: PUT
- Endpoint: /updateartist/:id
- Parameters:
    id (required): The ID of the artist to update.
- Request Body:
    Provide data for updating the artist.
    {
      "artist_name": "New Artist Name",
      "origin": "New Origin",
      "debut_year": 2015
    }

Responses
- 200 OK:
Artist information updated successfully.
    {
      "success": true,
      "message": "The information for New Artist Name has been updated successfully."
    }

- 404 Not Found:
Artist not found in the database.
    {
      "success": false,
      "message": "There is no artist with artist_id: ID in the database."
    }

- 500 Internal Server Error:
Something went wrong on the server.
    {
      "success": false,
      "error": "Internal Server Error"
    }

#### Delete album
Request
- Method: DELETE
- Endpoint: /deletealbum
- Request Body:
    Provide the title of the album to delete.
    {
      "album_title": "Album Title"
    }

Responses
- 200 OK:
Album successfully deleted from the database.
    {
      "success": true,
      "message": "Album successfully deleted from the database."
    }

- 404 Not Found:
Album not found in the database.
    {
      "success": false,
      "message": "Album doesn't exist in the database."
    }

- 500 Internal Server Error:
Something went wrong on the server.
    {
      "success": false,
      "error": "Internal Server Error"
    }

