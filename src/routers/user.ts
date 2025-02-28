import { Router } from "express";
import { login, logInWithGoogle, register } from "../controllers/user";

const router = Router();
router.post("/register", register);
router.post("/login", login);
router.post("/google-login", logInWithGoogle);
export default router;
