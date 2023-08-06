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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Vehicle_1 = __importDefault(require("../models/Vehicle"));
const User_1 = __importDefault(require("../models/User"));
const Coordinates_1 = __importDefault(require("../models/Coordinates"));
const VEHICLES = [
    {
        name: "Mi carro",
        brand: "Toyota",
        plates: "ABC123",
        color: "Rojo",
        model: "Corolla",
    },
    {
        name: "Mi moto",
        brand: "Honda",
        plates: "XYZ789",
        color: "Negro",
        model: "CBR",
    },
];
module.exports = {
    up: (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield User_1.default.findAll({ limit: 2 });
        const coordinates = yield Coordinates_1.default.findAll({ limit: 2 });
        const userIds = users.map((user) => user.id);
        const coordinatesIds = coordinates.map((coordinate) => coordinate.id);
        const vehicles = VEHICLES.map((vehicle, i) => (Object.assign(Object.assign({}, vehicle), { userId: userIds[i], coordinatesId: coordinatesIds[i] })));
        yield Vehicle_1.default.bulkCreate(vehicles);
    }),
    down: (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
        yield Vehicle_1.default.destroy({ where: {} });
    }),
};
