import express, { Response, Request } from 'express'
import cors from 'cors'
import { MongoClient, Db } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT: number = parseInt(process.env.PORT || '3000')

app.use(cors())
app.use(express.json())

const DB_USER: string =  'msadmin';
const DB_PASS: string = 'lVBPaRxqrIWHsRwM';
const DB_HOST: string =  'cluster0.hbq9zux.mongodb.net';
const DB_NAME: string =  'MSPARK'

const mongoURI: string = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`

var db: Db

MongoClient.connect(mongoURI)
  .then((client) => {
    console.log('MongoDB connected')
    db = client.db(DB_NAME)
  })
  .catch((err) => console.error('MongoDB connection error:', err))

app.get('/', (req: Request, res: Response) => {
  res.send('Muscle Hustle server running')
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

app.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await db.collection('users').find({}).toArray()
    res.send(users)
  } catch (error) {
    console.error('Error fetching users:', error)
    res.status(500).send('Internal Server Error')
  }
})
