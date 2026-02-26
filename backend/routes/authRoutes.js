import express from 'express';
import { librarySignUp, librarylogin }from '../controllers/authController.js';
const router = express.Router();

router.post('/view', librarySignUp);
router.post('/add', librarylogin);