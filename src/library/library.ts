import mongoose from 'mongoose';
import { InputDatabase, TBook, TUpdateBook } from '../types/library.type';
import Book from '../models/book.model';

export class Library {

  constructor(private inputDatabase: InputDatabase) {
    this.dbConnection();
  }

  async dbConnection() {
    try {
      if (this.inputDatabase.type !== 'mongodb') throw new Error('Invalid database type');
      const URI = `mongodb+srv://${this.inputDatabase.username}:${this.inputDatabase.password}@${this.inputDatabase.host}/${this.inputDatabase.database}?retryWrites=true&w=majority&appName=ClusterDev0`;
      await mongoose.connect(URI, { maxPoolSize: 10 }).then(() => console.log(`[${this.inputDatabase.type}] database : '${this.inputDatabase.database}' connection established`));
      // FIXME: This approach allow the multiple connection
      // await mongoose.createConnection(URI, { maxPoolSize: 10 }).asPromise().then(() => console.log(`[${this.inputDatabase.type}] database : '${this.inputDatabase.database}' connection established`));
    } catch (error) {
      console.log(error);
    }
  }

  async getAllBooks() {
    try {
      const books = await Book.find({});
      const result = books.map((book) => {
        return {
          id: book._id,
          title: book.title,
          pubDate: book.pubDate,
        };
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async createBook(book: TBook) {
    try {
      return await Book.create(book);
    } catch (error) {
      console.log(error);
    }
  }

  async updateBookById(id: string, book: TUpdateBook) {
    try {
      /**
       * TODO: allow only some values to be updated
       * @see https://mongoosejs.com/docs/validation.html#the-select-option
       */
      return await Book.findByIdAndUpdate(id, book, { new: true });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteBookById(id: string) {
    try {
      return await Book.findByIdAndDelete(id);
    } catch (error) {
      console.log(error);
    }
  }
}