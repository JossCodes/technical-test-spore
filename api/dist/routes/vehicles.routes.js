"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vehicles_controller_1 = require("../controllers/vehicles.controller");
const router = (0, express_1.Router)();
const { getAllVehicles, getVehicleById, getVehicleCoordinates, createVehicle, updateVehicle, updateVehicleCoordinates, deleteVehicle, } = vehicles_controller_1.VehiclesController;
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
exports.default = router;
