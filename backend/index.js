import app from './app.js';
import { connectDB } from './config/db.js';

const PORT = process.env.PORT || 5001;

async function startServer() {
  console.log('[Server] Initializing Express backend server...');
  await connectDB();
  app.listen(PORT, '0.0.0.0', () => console.log(`Express server running on http://localhost:${PORT}`));
}

startServer();
