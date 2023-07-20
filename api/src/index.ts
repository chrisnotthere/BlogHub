import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  database: process.env.DB_NAME || 'bloghub',
  password: process.env.DB_PASSWORD,
});

app.get('/posts', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM posts');
  res.send({ data: rows, message: 'all entries from posts table' });
});

const port = 5000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
