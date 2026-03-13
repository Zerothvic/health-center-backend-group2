import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import staffRoutes from './src/routes/user.route.js';


// Load environment variables
dotenv.config();

const app = express();

// GLOBAL MIDDLEWARE
app.use(cors()); // Allows our frontend to talk to this server
app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: true }));

// BASE ROUTES: This mounts all our staff endpoints under /api/v1/staff
app.use('/api/v1/staff', staffRoutes);

// Route Error handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

export default app;