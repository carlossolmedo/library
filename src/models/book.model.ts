import mongoose from 'mongoose';
import { TBook } from '../utils/types';

const pageObjectSchema = new mongoose.Schema({
  page: { type: Number, required: true },
  contentPage: { type: String, required: true },
});

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  pubDate: { type: String, required: true },
  pages: [{ type: pageObjectSchema }],
});

const Book = mongoose.model<TBook>('BookModel', bookSchema, 'books');

export default Book;