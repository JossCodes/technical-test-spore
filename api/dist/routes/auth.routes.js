"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
const { register, login } = auth_controller_1.AuthController;
router.post("/register", register);
router.post("/login", login);
exports.default = router;
