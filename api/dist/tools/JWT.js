"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const TOKEN_DURATION_DAY_IN_SECONDS = 86400;
const SECRET = process.env.JWT_SECRET || "mysecret";
const generateToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, SECRET, {
        expiresIn: TOKEN_DURATION_DAY_IN_SECONDS,
    });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    return jsonwebtoken_1.default.verify(token, SECRET);
};
exports.verifyToken = verifyToken;
