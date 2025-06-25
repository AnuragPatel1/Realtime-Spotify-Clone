import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js";
import { getAllUsers, getMessages } from "../controller/user.controller.js";

const router = express.Router();

router.get("/", protectRoute, getAllUsers)
router.get("/messages/:userId", protectRoute, getMessages);
export default router;