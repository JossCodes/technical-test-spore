import { Router } from "express";
import { VehiclesController } from "../controllers/vehicles.controller";

const router = Router();

const {
  getAllVehicles,
  getVehicleById,
  getVehicleCoordinates,
  createVehicle,
  updateVehicle,
  updateVehicleCoordinates,
  deleteVehicle,
} = VehiclesController;

// Get routes
router.get("/get-all", getAllVehicles);
router.get("/get-one/:vehicleId", getVehicleById);
router.get("/get-coordinates/:vehicleId", getVehicleCoordinates);

// Post routes
router.post("/create", createVehicle);

// Put routes
router.put("/update/:vehicleId", updateVehicle);
router.put("/update-coordinates/:vehicleId", updateVehicleCoordinates);

// Delete routes
router.delete("/delete/:vehicleId", deleteVehicle);

export default router;
