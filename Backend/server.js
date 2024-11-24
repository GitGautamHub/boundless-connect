import express from 'express';
import cors from 'cors';
import connectDB from './Database/db.js';
import loginRoutes from './routes/auth.js';
import shipmentRoutes from './routes/shipments.js';

// Initialize Express app
const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Mount routes
app.use('/api', loginRoutes);
app.use('/api/shipments', shipmentRoutes);

// Start the server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
