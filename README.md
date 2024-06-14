CRUD Js

Overview
  This project is a simple Node.js CRUD application using Express.js and MongoDB. It provides RESTful APIs for managing users with basic CRUD operations (Create, Read, Update, Delete).

Features
  RESTful API endpoints for user management (CRUD operations).
  MongoDB database integration for persistent data storage.
  Swagger documentation for API reference and testing.
  Environment variable management using dotenv for sensitive data.
  Lightweight and minimalistic setup for learning and demonstration purposes.
  
Technologies Used
  Node.js
  Express.js
  MongoDB (via Mongoose)
  Swagger UI for API documentation
  dotenv for environment variables
  
Getting Started

Installation
  Clone the repository: git clone <repository-url>  
  Install dependencies: npm install
  
Setup Environment Variables
  Create a .env file in the root directory.
  Add your MongoDB connection string as MONGO_URI=<your-mongodb-uri>.

Run the Application
  Start the server: npm start
  Access the application at: http://localhost:3000
  
API Documentation
  Swagger UI is available at: http://localhost:3000/api-docs

API Endpoints
  GET /users: Retrieve all users.
  POST /users: Create a new user.
  PUT /users/:id: Update a user by ID.
  DELETE /users/:id: Delete a user by ID.

