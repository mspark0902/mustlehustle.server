import express, { Response, Request } from 'express';
import cors from 'cors';
import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT: number = parseInt(process.env.PORT || '3000');

app.use(cors());
app.use(express.json());

const DB_USER: string = process.env.DB_USER || '';
const DB_PASS: string = process.env.DB_PASS || '';
const DB_HOST: string = process.env.DB_HOST || '';
const DB_NAME: string = process.env.DB_NAME || '';

const mongoURI: string = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

let db: Db;

const startServer = async () => {
  try {
    const client = await MongoClient.connect(mongoURI);
    console.log('MongoDB connected');
    db = client.db(DB_NAME);

    app.get('/', (req: Request, res: Response) => {
      res.send('Muscle Hustle server running');
    });

    app.get('/test', (req: Request, res: Response) => {
      res.send('Muscle Hustle test running');
    });

    app.get('/users', async (req: Request, res: Response) => {
      try {
        if (!db) {
          throw new Error('Database not initialized');
        }
        const users = await db.collection('users').find({}).toArray();
        res.send(users);
      } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal Server Error');
      }
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process if DB connection fails
  }
};

startServer();
