import express from "express"
import { protectRoute } from "../middlewares/authMiddleware.js";
import { getMessagesController, getUserForSideBar, sendMessagesController } from "../controllers/messageController.js";


const router=express.Router();

router.get("/users",protectRoute,getUserForSideBar)
router.get("/:id",protectRoute,getMessagesController)

router.post("/send/:id",protectRoute,sendMessagesController)

export default router