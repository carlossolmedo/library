import mongoose from 'mongoose';
import Book from '../models/book.model';
import { InputDatabase, TBook } from '../utils/types';
import { Library } from './library';

describe('Library tests suite', () => {
  let sut: Library;
  const testInputDatabase: InputDatabase = {
    type: 'mongodb',
    host: 'clusterdev0.1yss2xl.mongodb.net',
    port: 27017,
    username: 'admin_pono',
    password: 'rGrmJxKvLJKDHe3s',
    database: 'test'
  };

  const fakeResult: TBook[] = [
    {
      title: 'Book 1',
      author: 'Author 1',
      pubDate: new Date('2024-05-01'),
      pages: [
        { page: 1, contentPage: "Book 1 content page 1" },
        { page: 2, contentPage: "Book 1 content page 2" },
        { page: 3, contentPage: "Book 1 content page 3" }
      ]
    },
    {
      title: 'Book 2',
      author: 'Author 2',
      pubDate: new Date('2024-05-01'),
      pages: [
        { page: 1, contentPage: "Book 2 content page 1" },
        { page: 2, contentPage: "Book 2 content page 2" },
        { page: 3, contentPage: "Book 2 content page 3" }
      ]
    },
  ];

  it.todo('should connect to database')
  it.todo('should be able to connect to the database');
  it.todo('should be able to get all books');
  it.todo('should be able to create a book');
  it.todo('should be able to update a book');
  it.todo('should be able to delete a book');
  it.todo('should be able to import many books');
  it.todo('should be able to filter books by query');
});