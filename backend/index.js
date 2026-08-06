import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB, checkDBConnection } from './config/db.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/orders', orderRoutes);

// Health Check Endpoint
app.get('/api/health', async (req, res) => {
  const isConnected = checkDBConnection();
  return res.json({
    status: isConnected ? 'ok' : 'degraded',
    service: 'Paket Benih Sayur Botani Backend API',
    database: isConnected ? 'connected' : 'disconnected (Check MONGODB_URI credentials in .env)',
    timestamp: new Date().toISOString(),
  });
});

// Start Server
async function startServer() {
  console.log('[Server] Initializing Express backend server...');
  await connectDB();
  
  app.listen(PORT, () => {
    console.log(`🚀 Express server running on http://localhost:${PORT}`);
    console.log(`📍 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`📦 Orders API:  http://localhost:${PORT}/api/orders`);
  });
}

startServer();
