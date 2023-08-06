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
const Coordinates_1 = __importDefault(require("../models/Coordinates"));
const COORDINATES = [
    {
        latitude: 37.7749,
        longitude: -122.4194,
    },
    {
        latitude: 40.7128,
        longitude: -74.006,
    },
];
module.exports = {
    up: (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
        yield Coordinates_1.default.bulkCreate(COORDINATES);
    }),
    down: (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
        yield Coordinates_1.default.destroy({ where: {} });
    }),
};
