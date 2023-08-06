"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehiclesController = void 0;
const VehiclesController = {
    getAllVehicles: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return res.status(200).json({ message: "All vehicles" });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }),
    getVehicleById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return res.status(200).json({ message: "Vehicle by id" });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }),
    getVehicleCoordinates: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return res.status(200).json({ message: "Vehicle coordinates" });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }),
    createVehicle: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return res.status(200).json({ message: "Create vehicle" });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }),
    updateVehicle: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return res.status(200).json({ message: "Update vehicle" });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }),
    updateVehicleCoordinates: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return res.status(200).json({ message: "Update vehicle coordinates" });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }),
    deleteVehicle: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return res.status(200).json({ message: "Delete vehicle" });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }),
};
exports.VehiclesController = VehiclesController;
