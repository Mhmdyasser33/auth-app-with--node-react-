

# Simple Authentication App with Node.js and React

This repository contains a simple authentication application built using Node.js for the backend and React for the frontend. It provides basic user registration, login, and the ability to fetch a list of users (only for logged-in users).

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Backend Setup](#backend-setup)
    - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
    - [Registration](#registration)
    - [Login](#login)
    - [Fetching Users](#fetching-users)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

-   User Registration: Allows new users to register by providing a username and password.
-   User Login: Allows registered users to log in and obtain a JSON Web Token (JWT).
-   Protected Routes: The client-side will prevent unauthorized access to the dashboard page (only accessible by logged-in users).
-   Fetching Users (Authenticated): A route in the backend that only returns a list of users to authenticated users.
-   Basic Error Handling: Provides error messages for invalid registration or login attempts.

## Technology Stack

-   **Backend:**
    -   Node.js
    -   Express.js
    -   jsonwebtoken
    -   bcryptjs
    -   MongoDB (for data storage, or any other database you prefer)
    -   Mongoose (for MongoDB interaction)
-   **Frontend:**
    -   React
    -   React Router (for navigation)
    -   Fetch (for making API calls)

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

-   [Node.js](https://nodejs.org/) (v16 or higher)
-   [npm](https://www.npmjs.com/) (Node package manager, usually comes with Node.js) or [yarn](https://yarnpkg.com/)
-   [MongoDB](https://www.mongodb.com/) (or another database setup and its driver for Node.js)
-   A Code editor like VS Code.
-  Basic knowledge of react and node

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Mhmdyasser33/auth-app-with--node-react-
    cd folder-name
    ```

2.  **Install dependencies** (Make sure you are in the right directory for the following commands):
    ```bash
    # Go to the backend folder
    cd server 

    # install the backend dependencies using npm
    npm install 

    # or using yarn
    yarn install

    # Go back to the main folder
    cd ..

    # Go to the client folder
    cd client 

    # install the client dependencies using npm
    npm install 

    # or using yarn
    yarn install
    ```

### Backend Setup

1.  **Navigate to the `server` directory**:

    ```bash
    cd server
    ```

2.  **Create a `.env` file**: In the `server` directory, create a `.env` file to store your sensitive environment variables.  This is crucial for keeping sensitive data out of your code.

    ```
    PORT=5000 # or any port you prefer
    MONGO_URI=mongodb://localhost:27017/test
    JWT_SECRET=your_secret_key
    ```
    **Note:** Ensure your Mongo database is running.
3.  **Start the backend server:**

    ```bash
    npm run dev # or yarn run dev
    ```

   The server should now be running on port 5000 or whatever you have set in `.env` file (see previous step).

### Frontend Setup

1.  **Navigate to the `client` directory:**

    ```bash
    cd client
    ```
2.  **Create a `.env` file**: Create a `.env` file in the client directory to store your sensitive variables.

      ```
       VITE_BASE_URL="http://localhost:5000" 
      ```
 
3.  **Start the frontend development server:**

    ```bash
    npm run dev # or yarn run dev
    ```
    The React app should now be running in your browser, usually at `http://localhost:5173`

## Usage

### Registration

1.  Go to the registration page in the React app (usually available on a button click or `/register` route).
2.  Enter your desired username and password.
3.  Click the "Register" button.
4.  If successful, you will be logged in and redirected to the dashboard page.

### Login

1.  Go to the login page in the React app (usually available on a button click or `/login` route).
2.  Enter your registered username and password.
3.  Click the "Login" button.
4.  If successful, you will be logged in and redirected to the dashboard page.

### Fetching Users

1.  Go to the dashboard page (`/dashboard`) of the React app.
2.  Click on the "get users" button.
3.  If your credentials are valid, you'll see a list of users (usernames) returned from the backend.
    *   This feature is only available to authenticated users, the backend will handle the authentication and will return an error if not authorized.

## API Endpoints

Here are the backend API endpoints:

-   `POST /api/auth/register`: Registers a new user. Expects a JSON payload with `username` and `password`.
-   `POST /api/auth/login`: Logs in an existing user. Expects a JSON payload with `username` and `password`. Returns a JWT token if successful.
-   `GET /api/users`: Returns a list of registered users. Only available for logged-in users (requires a valid JWT token in the `Authorization` header).

## Contributing

Contributions are welcome! Here's how you can contribute:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/new-feature`).
3.  Make your changes and commit them (`git commit -am 'Add some feature'`).
4.  Push the branch to your fork (`git push origin feature/new-feature`).
5.  Create a pull request.

## License

This project is licensed under the [MIT License](LICENSE) - see the `LICENSE` file for details.

## Contact

If you have any questions or suggestions, feel free to contact the author:

- contact : muhmmed.yasserxi@gmail.com
