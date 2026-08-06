import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || 'botani_seed';

let client;
let db;
let isConnected = false;

export async function connectDB() {
  if (db && isConnected) return db;

  if (!uri) {
    console.warn('[MongoDB] MONGODB_URI missing in .env');
    return null;
  }

  try {
    client = new MongoClient(uri, {
      connectTimeoutMS: 5000,
      serverSelectionTimeoutMS: 5000,
    });
    await client.connect();
    db = client.db(dbName);
    isConnected = true;
    console.log(`[MongoDB] Connected successfully to database: "${dbName}"`);
    return db;
  } catch (error) {
    console.error('[MongoDB] Connection failed:', error.message);
    isConnected = false;
    return null;
  }
}

export function getDB() {
  if (!db || !isConnected) {
    throw new Error('Database connection not established. Check MONGODB_URI in .env.');
  }
  return db;
}

export function checkDBConnection() {
  return isConnected;
}

export async function closeDB() {
  if (client) {
    await client.close();
    db = null;
    client = null;
    isConnected = false;
    console.log('[MongoDB] Connection closed.');
  }
}
