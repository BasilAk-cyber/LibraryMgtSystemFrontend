import express from 'express';
import { addBook, viewBook, searchBook, getBookById, updateBook,deleteBook }from '../controllers/bookController.js';
import protectRoute from '../middlewares/authMiddleware.js';
const router = express.Router();

router.get('/view', protectRoute, viewBook);
router.post('/add', protectRoute, addBook);
router.get('/search', protectRoute, searchBook);
router.get('/:id', protectRoute, getBookById);
router.put('/:id', protectRoute, updateBook);
router.delete('/:id', protectRoute, deleteBook);

export default router;