"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth.routes"));
const vehicles_routes_1 = __importDefault(require("./vehicles.routes"));
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
// Routes without authentication
router.use("/auth", auth_routes_1.default);
// Routes with authentication
router.use(middlewares_1.AuthMiddleware.verifyToken);
router.use("/vehicles", vehicles_routes_1.default);
exports.default = router;
