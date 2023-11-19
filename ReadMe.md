MERN Stack Notes App

This is an application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The application allows users to perform CRUD (Create, Read, Update, Delete) operations on notes. Additionally, users can search for notes and customize the font and background color according to their preferences.

Getting Started

These instructions will help you set up and run the MERN stack notes app on your local machine.

Prerequisites
Make sure you have the following software installed on your machine:

Node.js and npm (Node Package Manager)
MongoDB
Installing
Clone the repository to your local machine:

bash
Copy code
git clone https://github.com/your-username/mern-stack-notes-app.git
Navigate to the project directory:

bash
Copy code
cd mern-stack-notes-app
Install server dependencies:

bash
Copy code
npm install
Navigate to the client directory:

bash
Copy code
cd client
Install client dependencies:

bash
Copy code
npm install
Setting Up the Database
Make sure your MongoDB server is running.

Create a .env file in the root of the server directory (mern-stack-notes-app/server) and add the following:

env
Copy code
MONGODB_URI=your_mongodb_connection_string
Replace your_mongodb_connection_string with your actual MongoDB connection string.

Running the Application
Back in the server directory (mern-stack-notes-app/server), start the server:

bash
Copy code
npm start
This will run the Express server on http://localhost:PORT.

Open a new terminal, navigate to the client directory (mern-stack-notes-app/client), and start the React app:

bash
Copy code
npm start
This will run the React app on http://localhost:3000.

Open your web browser and go to http://localhost:3000 to access the MERN stack notes app.

Features

CRUD Operations: Perform Create, Read, Update, and Delete operations on notes.
Search Functionality: Search for notes based on keywords.
Customization: Change font and background color preferences.

Technologies Used
MongoDB: NoSQL database for storing notes.
Express.js: Backend framework for building the server.
React.js: Frontend library for building the user interface.
Node.js: JavaScript runtime for server-side development.