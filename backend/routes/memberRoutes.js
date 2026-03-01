import express from 'express';
import { addMember, viewMembers} from '../controllers/memberController.js';
const router = express.Router();

router.post("/add", addMember)
router.add("/view", viewMembers)

export default router;