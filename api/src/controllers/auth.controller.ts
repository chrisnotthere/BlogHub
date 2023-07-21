import { Request, Response } from 'express';
import { db } from '../config/db';

export const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    // Check if the user already exists
    const [users]: any = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if (users.length > 0) {
      return res.status(400).json({ message: 'Username already exists.' });
    }

    // If user does not exist, insert the new user into the database
    // TODO: hash the password before storing, this is just a placeholder
    await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);

    // success response
    res.json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    // Check if the user exists
    const [users]: any = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if (users.length === 0) {
      return res.status(400).json({ message: 'Invalid username or password.' });
    }

    // Compare the password
    const user = users[0];
    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid username or password.' });
    }

    // If the passwords match, send a success response
    // TODO: send a JWT instead of a success message
    res.json({ message: 'User logged in successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};
