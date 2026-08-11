import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { DEFAULT_PRODUCTS } from '../data/defaultProducts.js';
import { DEFAULT_TESTIMONIALS, DEFAULT_FAQS, DEFAULT_GALLERY } from '../data/defaultContent.js';

dotenv.config();

let client;
let db;
let isConnected = false;

export async function connectDB() {
  if (db && isConnected) return db;

  const uri = process.env.MONGODB_URI;
  const dbName = process.env.DB_NAME || 'botani_seed';

  if (!uri) {
    console.warn('[MongoDB] MONGODB_URI missing in environment');
    return null;
  }

  try {
    client = new MongoClient(uri, {
      connectTimeoutMS: 5000,
      serverSelectionTimeoutMS: 5000,
    });
    await client.connect();
    db = client.db(dbName);
    await db.collection('orders').createIndex({ orderNumber: 1 }, { unique: true });
    await db.collection('products').createIndex({ slug: 1 }, { unique: true });
    const seededAt = new Date();
    await db.collection('products').bulkWrite(DEFAULT_PRODUCTS.map((product) => ({
      updateOne: {
        filter: { slug: product.slug },
        update: { $setOnInsert: { ...product, imageUrl: '', active: true, createdAt: seededAt, updatedAt: seededAt } },
        upsert: true,
      },
    })));
    await db.collection('products').bulkWrite(DEFAULT_PRODUCTS.map((product) => ({
      updateOne: {
        filter: { slug: product.slug },
        update: [{ $set: {
          nameEn: { $ifNull: ['$nameEn', product.nameEn] },
          descriptionEn: { $ifNull: ['$descriptionEn', product.descriptionEn] },
        } }],
      },
    })));

    // Seed Testimonials, FAQs, and Gallery
    await db.collection('testimonials').bulkWrite(DEFAULT_TESTIMONIALS.map((item) => ({
      updateOne: { filter: { id: item.id }, update: { $set: item }, upsert: true },
    })));
    await db.collection('faq').bulkWrite(DEFAULT_FAQS.map((item) => ({
      updateOne: { filter: { id: item.id }, update: { $set: item }, upsert: true },
    })));
    await db.collection('gallery').bulkWrite(DEFAULT_GALLERY.map((item) => ({
      updateOne: { filter: { id: item.id }, update: { $set: item }, upsert: true },
    })));

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
