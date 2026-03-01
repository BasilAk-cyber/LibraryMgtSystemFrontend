import express from 'express';
import { addBook, viewBook }from '../controllers/bookController.js';
const router = express.Router();

router.get('/view', viewBook);
router.post('/add', addBook);

export default router;