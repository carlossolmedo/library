import express from 'express';
import Book from '../models/book.model';
import { Library } from '../library/library';
import { dbCredentials } from '../config';
const router = express.Router();

const alexandria = new Library({
  type: dbCredentials.type,
  host: dbCredentials.host,
  port: dbCredentials.port,
  username: dbCredentials.username,
  password: dbCredentials.password,
  database: dbCredentials.database
});

// TODO: Use only if multiple connection is enabled
// const london = new Library({
//   type: dbCredentials.type,
//   host: dbCredentials.host,
//   port: dbCredentials.port,
//   username: dbCredentials.username,
//   password: dbCredentials.password,
//   database: 'test'
// });

router.get('/', async (req, res) => {
  try {
    const result = await alexandria.getAllBooks();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/create', async (req, res) => {
  try {
    const result = await alexandria.createBook(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/update/:id', async (req, res) => {
  try {
    const result = await alexandria.updateBookById(req.params.id, req.body);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(400).json({ message: 'Invalid update values' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
})

router.delete('/delete/:id', async (req, res) => {
  try {
    const result = await alexandria.deleteBookById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;