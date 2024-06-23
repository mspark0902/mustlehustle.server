import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const url: string = process.env.MONGODB_URI || '';
const client = new MongoClient(url, {
  serverSelectionTimeoutMS: 30000,
});

let db: any;

const connectDB = async () => {
  if (db) return db;
  try {
    await client.connect();
    db = client.db(process.env.DB_NAME);
    console.log('Connected to database');
    return db;
  } catch (error) {
    console.error('Could not connect to database', error);
    throw error;
  }
};

export { connectDB, client };
