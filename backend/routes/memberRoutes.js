import express from 'express';
import { addMember, viewMembers} from '../controllers/memberController.js';
import protectRoute from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post("/add", protectRoute, addMember)
router.get("/view", protectRoute, viewMembers)

export default router;