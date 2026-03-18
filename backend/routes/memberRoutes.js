import express from 'express';
import { addMember, viewMembers, searchMember, getMemberById, updateMember, deleteMember} from '../controllers/memberController.js';
import protectRoute from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post("/add", protectRoute, addMember)
router.get("/view", protectRoute, viewMembers)
router.get("/search", protectRoute, searchMember)
router.get("/:id", protectRoute, getMemberById)
router.put("/:id", protectRoute, updateMember)
router.delete("/:id", protectRoute, deleteMember)

export default router;