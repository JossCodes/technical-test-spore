import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const router = Router();

const { register, login } = AuthController;

router.post("/register", register);
router.post("/login", login);

export default router;
