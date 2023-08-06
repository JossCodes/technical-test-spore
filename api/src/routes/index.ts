import { Router } from "express";
import AuthRoutes from "./auth.routes";
import VehiclesRoutes from "./vehicles.routes";
import { AuthMiddleware } from "../middlewares";

const router = Router();

// Routes without authentication
router.use("/auth", AuthRoutes);

// Routes with authentication
router.use(AuthMiddleware.verifyToken);
router.use("/vehicles", VehiclesRoutes);

export default router;
