"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vehicles_controller_1 = require("../controllers/vehicles.controller");
const router = (0, express_1.Router)();
const { getAllVehicles } = vehicles_controller_1.VehiclesController;
router.post("/getAll", getAllVehicles);
exports.default = router;
