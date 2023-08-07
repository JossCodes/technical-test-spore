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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehiclesController = void 0;
const Vehicle_1 = __importDefault(require("../models/Vehicle"));
const Coordinates_1 = __importDefault(require("../models/Coordinates"));
const utils_1 = require("../utils");
const VehiclesController = {
    getAllVehicles: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { user } = req.body.authorization;
            let { page = 0, pageSize = 10 } = req.query;
            page = Number(page);
            pageSize = Number(pageSize);
            let vehicles, totalPages;
            const vehicleQuery = {
                limit: pageSize,
                offset: page * pageSize,
                attributes: { exclude: ["coordinatesId"] },
                include: [
                    {
                        model: Coordinates_1.default,
                        as: "coordinates",
                        attributes: { exclude: ["createdAt", "updatedAt"] },
                    },
                ],
                subQuery: false,
                order: ["id"],
            };
            if (user.role.name === "superuser") {
                vehicles = yield Vehicle_1.default.findAll(vehicleQuery);
                const totalVehicles = yield Vehicle_1.default.count();
                totalPages = Math.ceil(totalVehicles / pageSize);
            }
            else {
                vehicles = yield Vehicle_1.default.findAll(Object.assign({ where: {
                        userId: user.id,
                    } }, vehicleQuery));
                const totalVehicles = yield Vehicle_1.default.count({
                    where: {
                        userId: user.id,
                    },
                });
                totalPages = Math.ceil(totalVehicles / pageSize);
            }
            const data = {
                vehicles: vehicles.map((vehicle) => {
                    let write = false;
                    if (user.id === vehicle.userId) {
                        write = true;
                    }
                    return Object.assign(Object.assign({}, vehicle.dataValues), { write });
                }),
                totalPages,
            };
            return res.status(200).json({ message: "All vehicles result", data });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }),
    getVehicleById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { user } = req.body.authorization;
            const { vehicleId } = req.params;
            const vehicle = yield Vehicle_1.default.findByPk(vehicleId, {
                attributes: { exclude: ["coordinatesId"] },
                include: [
                    {
                        model: Coordinates_1.default,
                        as: "coordinates",
                        attributes: { exclude: ["createdAt", "updatedAt"] },
                    },
                ],
            });
            if (!vehicle || !(0, utils_1.hasVehicleAccess)(vehicle, user, user.role))
                return res.status(404).json({ message: "Vehicle not found" });
            return res.status(200).json({
                message: "Vehicle by id retrived succesfully",
                data: { vehicle },
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }),
    getVehicleCoordinates: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { user } = req.body.authorization;
            const { vehicleId } = req.params;
            const vehicle = yield Vehicle_1.default.findByPk(vehicleId, {
                raw: true,
                attributes: ["userId", "coordinatesId"],
            });
            if (!vehicle || !(0, utils_1.hasVehicleAccess)(vehicle, user, user.role)) {
                return res.status(404).json({ message: "Vehicle not found" });
            }
            const coordinates = yield Coordinates_1.default.findByPk(vehicle.coordinatesId, {
                attributes: { exclude: ["createdAt", "updatedAt"] },
            });
            const write = user.id === vehicle.userId;
            return res.status(200).json({
                message: "Vehicle coordinates retrived succesfully",
                data: { coordinates, write },
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }),
    createVehicle: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { user } = req.body.authorization;
            const { name, brand, plates, color, model, image, latitude, longitude } = req.body;
            if (!name || !brand) {
                return res.status(400).json({
                    error: "Missing params, you have to provide at least a name and a brand to create a vehicle. Verify and try again.",
                });
            }
            let coordinatesId = null, coordinates;
            if (latitude && longitude) {
                coordinates = yield Coordinates_1.default.create({
                    latitude,
                    longitude,
                });
                coordinatesId = coordinates.id;
            }
            const vehicle = yield Vehicle_1.default.create({
                userId: user.id,
                name,
                brand,
                plates,
                color,
                model,
                image,
                coordinatesId,
            });
            const newVehicle = Object.assign(Object.assign({}, vehicle.dataValues), { coordinates, coordinatesId: undefined });
            return res.status(200).json({
                message: "Vehicle created successfully!",
                data: { newVehicle },
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }),
    updateVehicle: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { user } = req.body.authorization;
            const { vehicleId } = req.params;
            const _a = req.body, { latitude, longitude } = _a, vehiclePayload = __rest(_a, ["latitude", "longitude"]);
            const vehicle = yield Vehicle_1.default.findByPk(vehicleId, {
                attributes: { exclude: ["coordinatesId"] },
            });
            if (!vehicle || !(0, utils_1.hasVehicleAccess)(vehicle, user, user.role, true)) {
                return res.status(404).json({ message: "Vehicle not found" });
            }
            yield vehicle.update(Object.assign({}, vehiclePayload));
            return res.status(200).json({
                message: "Vehicle updated succesfully!",
                data: { vehicle },
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }),
    updateVehicleCoordinates: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { user } = req.body.authorization;
            const { vehicleId } = req.params;
            const { latitude, longitude } = req.body;
            const vehicle = yield Vehicle_1.default.findByPk(vehicleId);
            if (!vehicle || !(0, utils_1.hasVehicleAccess)(vehicle, user, user.role, true)) {
                return res.status(404).json({ message: "Vehicle not found" });
            }
            let coordinatesId = null;
            let coordinates = yield Coordinates_1.default.findByPk(vehicle.coordinatesId);
            if (!coordinates) {
                coordinates = yield Coordinates_1.default.create({
                    latitude: latitude || "",
                    longitude: longitude || "",
                });
            }
            else {
                yield coordinates.update({ latitude, longitude });
            }
            coordinatesId = coordinates.id;
            yield vehicle.update({
                coordinatesId,
            });
            return res.status(200).json({
                message: "Vehicle coordinates updated successfully!",
                data: { coordinates },
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }),
    deleteVehicle: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { user } = req.body.authorization;
            const { vehicleId } = req.params;
            const vehicle = yield Vehicle_1.default.findByPk(vehicleId);
            if (!vehicle || !(0, utils_1.hasVehicleAccess)(vehicle, user, user.role, true)) {
                return res.status(404).json({ message: "Vehicle not found" });
            }
            yield vehicle.destroy();
            const coordinatesId = vehicle.coordinatesId;
            const coordinates = yield Coordinates_1.default.findByPk(coordinatesId);
            if (coordinates)
                yield coordinates.destroy();
            return res.status(200).json({ message: "Vehicle deleted succesfully!" });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }),
};
exports.VehiclesController = VehiclesController;
