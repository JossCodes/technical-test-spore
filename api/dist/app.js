"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
const BASE_PATH = process.env.BASE_PATH || "/api";
app.use(BASE_PATH, routes_1.default);
const PORT = process.env.PORT || 5000;
const BASE_URL = process.env.BASE_URL || "http://localhost";
app.listen(PORT, () => console.log(`Server running on ${BASE_URL}:${PORT}${BASE_PATH}`));
