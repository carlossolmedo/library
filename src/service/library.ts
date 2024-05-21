import mongoose from 'mongoose';
import fs from 'fs';
import { InputDatabase, TBook, TUpdateBook } from '../utils/types';
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

      /**
       * TODO: Allow multiple connection
       * @see https://mongoosejs.com/docs/connections.html#multiple_connections
       * await mongoose.createConnection(URI, { maxPoolSize: 10 }).asPromise().then(() => console.log(`[${this.inputDatabase.type}] database : '${this.inputDatabase.database}' connection established`));
       */
    } catch (error) {
      console.error(error);
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
      console.error(error);
    }
  }

  async createBook(book: TBook) {
    try {
      return await Book.create(book);
    } catch (error) {
      console.error(error);
    }
  }

  async updateBookById(id: string, book: TUpdateBook) {
    try {
      /**
       * TODO: allow only some values to be updated with mongoose
       * @see https://mongoosejs.com/docs/validation.html#the-select-option
       */
      if (!isValidToUpdate(book)) throw new Error('Invalid update values');
      return await Book.findByIdAndUpdate(id, book, { new: true });
    } catch (error) {
      console.error(error);
    }
  }

  async deleteBookById(id: string) {
    try {
      return await Book.findByIdAndDelete(id);
    } catch (error) {
      console.error(error);
    }
  }

  async importBooks() {
    const directoryPath = './src/imports';

    fs.readdir(directoryPath, (err, dirs) => {
      if (err) {
        console.error('Error reading imports directory: ', err);
        return;
      }

      dirs.forEach((nameDir: string) => {
        const pathToDir = `${directoryPath}/${nameDir}`;
        console.log('pathToDir: ', pathToDir);

        fs.readdir(pathToDir, (err, file) => {
          if (err) {
            console.error('Error reading book directory:', err);
            return;
          }

          file.forEach((nameFile) => {
            if (nameFile.endsWith('.txt')) {
              const pathToFile = `${directoryPath}/${nameDir}/${nameFile}`;
              extractLinesFromFile(pathToFile);
            }
          });
        });
      });
    });
  }

  async filterBooks(filter: object) {
    try {
      return await Book.find(filter).exec();
    } catch (error) {
      console.error(error);
    }
  }
}

function isValidToUpdate(updateBook: { [key: string]: any }) {
  const allowedFields = ['title', 'author', 'pubDate'];
  const updateFields = Object.keys(updateBook);
  if (updateFields.length > 1) {
    return updateFields.every((field) => allowedFields.includes(field));
  }
}

function extractLinesFromFile(pathToFile: string) {

  fs.readFile(pathToFile, 'utf8', async (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

    const bookLines: any = {
      title: '',
      author: '',
      pubDate: '',
      pages: [],
    };

    // Extract title, author and pubDate
    if (pathToFile.endsWith('1.txt')) {
      const keywords = ['Project Gutenberg eBook of ', 'Author:', 'Release date:'];
      const lines = data.split('\n');

      for (const keyword of keywords) {
        const keywordLine = lines.find(line => line.startsWith(keyword));
        if (keywordLine) {
          keyword === keywords[0] ? bookLines.title = keywordLine.slice(keyword.length).trim() : '';
          keyword === keywords[1] ? bookLines.author = keywordLine.slice(keyword.length).trim() : '';
          keyword === keywords[2] ? bookLines.pubDate = keywordLine.slice(keyword.length).trim() : '';
          console.log(`Extracted ${keyword}: ${keywordLine.slice(keyword.length).trim()}`);
        } else {
          console.log('Keyword not found in the file');
        }
      }
    }

    // Extract pages
    const pages: any = [];
    const regex = /\/(\d+)\.txt$/; // Match number of page
    const match = pathToFile.match(regex);
    const numberOfPage = match ? match[1] : null;

    if (numberOfPage) {
      pages.push({ page: numberOfPage, contentPage: data });
    }
    bookLines.pages = pages;

    console.log('bookLines: ', bookLines);

    // TODO: Save Book in database
    try {
      await Book.create(bookLines);
    } catch (error) {
      console.error(error);
    }
  });
}