import express from 'express';
import { addBook, viewBook }from '../controllers/bookController.js';
import protectRoute from '../middlewares/authMiddleware.js';
const router = express.Router();

router.get('/view', protectRoute, viewBook);
router.post('/add', protectRoute, addBook);

export default router;