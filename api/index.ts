import express, { Response, Request } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes';
import { connectDB } from '../lib/db';

dotenv.config();

const app = express();
const PORT: number = parseInt(process.env.PORT || '3000');

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Muscle Hustle server running');
});

app.get('/test', (req: Request, res: Response) => {
  res.send('Muscle Hustle test running');
});

app.use('/api', apiRoutes);

async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();
