import express from 'express';
import { Library } from '../service/library';
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

/**
 * @swagger
 * /books/:
 *   get:
 *     summary: Get a list of all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               [
 *                {
 *                  "id": "6645d6b48cb2e90c9b36bc3d",
 *                  "title": "Example Title",
 *                  "pubDate": "2024-05-16T11:47:00.000Z"
 *                },
 *              ]
 */
router.get('/', async (req, res) => {
  try {
    const result = await alexandria.getAllBooks();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});


/**
 * @swagger
 * /books/create:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     responses:
 *       201:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               [
 *                {
 *                  "title": "Example title",
 *                  "author": "Author Name",
 *                  "pubDate": "2024-05-16T19:15:00.000Z",
 *                   "pages": [
 *                     {
 *                       "page": 1,
 *                      "contentPage": "Content page 1",
 *                      "_id": "6647049cd1baf75978cee197"
 *                    },
 *                  ],
 *                }
 *              ]
 */
router.post('/create', async (req, res) => {
  try {
    const result = await alexandria.createBook(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

/**
 * @swagger
 * /books/update/{id}:
 *   put:
 *     summary: Update book by id
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *                {
 *                  "title": "Example title",
 *                  "author": "Author Name",
 *                  "pubDate": "2024-05-16T19:15:00.000Z",
 *                }
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Invalid update values"
 */
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

/**
 * @swagger
 * /books/delete/{id}:
 *   delete:
 *     summary: Delete one book by id
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               {
 *                   "_id": "6647049cd1baf75978cee196",
 *                  "title": "Example Title deleted",
 *                   "author": "Author Name",
 *                   "pubDate": "2024-05-16T19:15:00.000Z",
 *                   "pages": [
 *                     {
 *                       "page": 1,
 *                       "contentPage": "Content page 1",
 *                       "_id": "6647049cd1baf75978cee197"
 *                     },
 *                    {
 *                      "page": 2,
 *                       "contentPage": "Content page 2",
 *                      "_id": "6647049cd1baf75978cee198"
 *                   },
 *                    {
 *                      "page": 3,
 *                      "contentPage": "Content page 3",
 *                      "_id": "6647049cd1baf75978cee199"
 *                    }
 *                  ],
 *                  "__v": 0
 *                }
 */
router.delete('/delete/:id', async (req, res) => {
  try {
    const result = await alexandria.deleteBookById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

/**
 * @swagger
 * /books/imports:
 *   get:
 *     summary: Launch the import of books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           text/plain:
 *             example:
 *              Import launched
 */
router.get('/imports', async (req, res) => {
  try {
    await alexandria.importBooks();
    res.status(200).send('Import launched');
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;