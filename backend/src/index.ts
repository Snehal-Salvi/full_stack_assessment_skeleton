// This file sets up and starts the Express server, including middleware and route handling.
// It also initializes the TypeORM DataSource for database connection.

import express from 'express';
import { AppDataSource } from './data-source';
import userRoutes from './routes/userRoutes';
import homeRoutes from './routes/homeRoutes';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse incoming JSON requests

// Route handling
app.use('/user', userRoutes); // User-related routes
app.use('/home', homeRoutes); // Home-related routes

// Initialize the database and start the server
AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(error => console.log(error)); // Log any initialization errors
