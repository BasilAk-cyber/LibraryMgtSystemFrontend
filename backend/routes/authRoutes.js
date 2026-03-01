import express from 'express';
import { librarySignUp, libraryLogin }from '../controllers/authController.js';
const router = express.Router();

router.post('/signup', librarySignUp);
router.post('/login', libraryLogin);

export default router;