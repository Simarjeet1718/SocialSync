import express from "express"
import { checkAuthController, loginController, logoutController, signUpController, updateProfileController } from "../controllers/authControllers.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const router=express.Router();

router.post("/signup",signUpController)

router.post("/login",loginController)

router.post("/logout",logoutController)

router.put("/updateprofile",protectRoute,updateProfileController)

router.get("/check",protectRoute,checkAuthController)

export default router