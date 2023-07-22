import { Request, Response } from 'express';
import { db } from '../config/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

    // Hash the password before storing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert the new user into the database
    await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);

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
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: 'Invalid username or password.' });
    }

    // If the passwords match, generate a JWT
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1h' });

    // Send the JWT in a HttpOnly cookie
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',  // Protect against CSRF
      secure: true,  // Only send cookie over HTTPS
      maxAge: 3600000  // Expires after 1 hour
    });

    // success response
    res.json({ message: 'User logged in successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};
