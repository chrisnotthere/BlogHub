# BlogHub

BlogHub is a full-featured blog Content Management System (CMS) that empowers users to post, edit, rate, and engage with various blog content. Built with TypeScript, React, Node/Express, and MySQL, this project showcases modern web development practices and design patterns.

[View the live project here](https://chrisnotthere.github.io/BlogHub)

_Note: The API and Database are hosted on Heroku's free tier, which may cause them to go to sleep after a period of inactivity. If you experience a delay in loading (or "no posts to display"), please refresh the page or wait a moment for the system to wake up._

## Features
  - **Authentication & Authorization:** Utilizes JSON Web Tokens (JWT) for secure user authentication and role-based authorization.
  - **User Management:** Allows Registration, Login/Logout, and supports multiple roles, including member, writer, and admin, each with unique permissions.
  - **Blog Management:** Enables users to Create, Read, Update, and Delete (CRUD) blog posts with ease.
  - **Sort & Filter:** Offers the ability to filter blog posts by tags, and sort by date created.
  - **Engagement:** Users can rate posts (up to 5 stars), create and delete comments, and like or unlike comments.
  - **Pagination:** Implements pagination to navigate through blog posts.

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

