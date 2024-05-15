import express from 'express';
const router = express.Router();

router.get('/', function (req, res, next) {
  res.send('books respond with a resource');
});

export default router;