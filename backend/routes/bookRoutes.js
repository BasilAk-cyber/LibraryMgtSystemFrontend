import express from 'express';
import { addBook, viewBook, searchBook, getBookById, updateBook }from '../controllers/bookController.js';
import protectRoute from '../middlewares/authMiddleware.js';
const router = express.Router();

router.get('/view', protectRoute, viewBook);
router.post('/add', protectRoute, addBook);
router.get('/search', protectRoute, searchBook);
router.get('/:id', protectRoute, getBookById);
router.put('/:id', protectRoute, updateBook);

export default router;