# Library

API to manage a Library

## Run application

```bash
npm run start # production
npm run dev # development
npm run test
```

## API Documentation

Go to : `http://localhost:3000/api-docs/` open the route section and try it out

## Imports

To launch massive imports of books, you can follow the next steps :

1. Create a `imports` folder.
2. Put the book folder you want to import in the `imports` folder.
3. Launch the import route : `/books/imports`

The folder should have the follow structure :

```bash
├── src
    └── imports # all books to import
        └── My book to import/
```
