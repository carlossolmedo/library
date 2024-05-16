import mongoose from 'mongoose';
import Book from '../models/book.model';
import { InputDatabase } from '../types/library.type';
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

  const fakeResult = [
    {
      id: '1',
      title: 'Book 1',
      pubDate: '2022-01-01',
    },
    {
      id: '2',
      title: 'Book 2',
      pubDate: '2022-02-01',
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