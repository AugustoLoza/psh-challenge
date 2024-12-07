# PSh-Game Statistics and Web Report

## Project Description

**PSh-Game**This project involves generating statistics for matches between players and a web report with the best players.

## Features

### A. Simulate Game Statistics

Randomly insert game statistics into a MySQL database for 0 to 10 players with the following details:

- **Stat ID**: Unique identifier for the statistic.
- **Player ID**: Unique identifier for the player.
- **Nickname**: Random nickname (generated using [Random User API](https://randomuser.me/api)).
- **Profile Image**: Random profile image (generated using [Random User API](https://randomuser.me/api)).
- **Create Date**: Timestamp of when the stat was created.
- **Update Date**: Timestamp of when the stat was created.
- **Score**: Random score between 1 and 100.

A cron job runs this operation every 5 minutes.

### B. Web Report

Generate a web report displaying:

- **Top 10 Best Scores**: Shows the best scores of players from the entire history.
- **Last Stats Generation Time**: Displays the last time statistics were generated.

### C. Automatic Refresh

The report automatically refreshes statistics every 10 seconds without reloading the web page.

### D. Export to CSV

A button allows exporting the report to a CSV file.

## Technologies Used

- **NestJS**: Backend framework to handle data operations and API endpoints.
- **MySQL**: Database to store game statistics.
- **Swagger**: API documentation and testing tool integrated with NestJS.
- **React**: Frontend framework to build the web report interface.

## Setup and Installation

1. **Clone the Repository**:
2. **Navigate to the `backend/` directory**
3. **Install Dependencies**:
4. **Create a `.env.local` file in the `backend/` directory with your MySQL credentials and the database name**:

```
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=yourdatabase
```

5. **Start the Server**:

```
   sh
   npm run start:dev
```

6. **Open the Frontend**:
7. **Install Dependencies**
8. **Create a `.env.local` file in the `frontend/` directory with your PORT and API_URL**:

```
   PORT=3001
   REACT_APP_API_URL=http://localhost:3000
```

9. **Navigate to the frontend folder and start the React application**:

```
   sh
   cd frontend
   npm install
   npm start
```

## Usage

- Access the Swagger documentation at `http://localhost:3000/api`.
- View the web report at `http://localhost:3001`.
