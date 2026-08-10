import app from '../backend/app.js';
import { connectDB } from '../backend/config/db.js';

let dbInitPromise = null;

export default async function handler(req, res) {
  if (!dbInitPromise) {
    dbInitPromise = connectDB().catch((err) => {
      console.warn('[Serverless DB] Note:', err?.message || err);
    });
  }
  await dbInitPromise;
  return app(req, res);
}
