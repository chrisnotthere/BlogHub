# BlogHub

BlogHub is a blog CMS project built using TypeScript, React, Node/Express, and MySQL. It allows multiple users to post and edit blogs, rate and comment, filter, and more.

Features include:
  - user authentication and authorization
  - user roles - admin, editor, blogger, user
  - blog filtering (tags and categories), rating, and comments
  - blogger profiles - recent/featured blogs, about, average rating, comments/interactions

## Project Structure

```
/BlogHub
|-- /client
|-- /api
|-- docker-compose.yml
|-- README.md
```

- The `/client` directory contains the React frontend of the application.
- The `/api` directory contains the Node.js/Express backend of the application.
- The `docker-compose.yml` file defines the services that make up the application.
- The `README.md` file (this file) provides an overview of the project.

## Services

BlogHub is made up of three main services:

### 1. Client

The Client service runs the React frontend of the application. The frontend is responsible for presenting data to users and handling user interactions. It is built using TypeScript and communicates with the backend through HTTP requests.

### 2. API

The API service runs the Node.js/Express server that acts as the backend of the application. The server processes client requests, interacts with the MySQL database, and sends responses back to the client. It is also built using TypeScript.

### 3. DB

The DB service runs the MySQL database where all the data related to the application is stored.

## Getting Started

TODO: Create instructions for running the project via docker.

