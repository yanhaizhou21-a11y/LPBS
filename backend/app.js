import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { checkDBConnection } from './config/db.js';
import orderRoutes from './routes/orderRoutes.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';

const app = express();

const allowedOrigins = new Set(
  (process.env.WEB_ORIGINS || 'http://localhost:3000,http://localhost:5173')
    .split(',').map((origin) => origin.trim()).filter(Boolean)
);

app.disable('x-powered-by');
app.use((_, res, next) => {
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  if (process.env.NODE_ENV === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }
  next();
});

app.use(cors({
  credentials: true,
  origin(origin, callback) {
    callback(origin && !allowedOrigins.has(origin) ? new Error('Origin tidak diizinkan.') : null, true);
  },
}));

app.use(express.json({ limit: '32kb' }));

app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.get('/api/health', (_req, res) => {
  const isConnected = checkDBConnection();
  res.json({
    status: isConnected ? 'ok' : 'degraded',
    service: 'Botani Seed Backend API',
    database: isConnected ? 'connected' : 'disconnected',
    adminAuthConfigured: Boolean(
      process.env.ADMIN_USER && process.env.ADMIN_PASSWORD_HASH && (process.env.ADMIN_SESSION_SECRET || '').length >= 32
    ),
    timestamp: new Date().toISOString(),
  });
});

export default app;
