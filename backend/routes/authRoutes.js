import express from 'express';
import { librarySignUp, libraryLogin, memberVerifyEmail }from '../controllers/authController.js';
const router = express.Router();

router.post('/signup', librarySignUp);
router.post('/login', libraryLogin);
router.get('/verify-email', memberVerifyEmail);

export default router;