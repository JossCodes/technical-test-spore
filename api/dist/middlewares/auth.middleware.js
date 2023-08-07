"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const tools_1 = require("../tools");
const AuthMiddleware = {
    verifyToken: (req, res, next) => {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }
        try {
            const decodedToken = (0, tools_1.verifyToken)(token);
            req.body.authorization = { user: decodedToken };
            next();
        }
        catch (error) {
            console.log(error);
            return res.status(401).json({ message: "Invalid token" });
        }
    },
};
exports.AuthMiddleware = AuthMiddleware;
