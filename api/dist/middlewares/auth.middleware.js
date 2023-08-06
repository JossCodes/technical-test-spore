"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const tools_1 = require("../tools");
const AuthMiddleware = {
    verifyToken: (req, res, next) => {
        var _a;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }
        try {
            const decodedToken = (0, tools_1.verifyToken)(token);
            req.body.authorization.user = decodedToken;
            next();
        }
        catch (error) {
            return res.status(401).json({ message: "Invalid token" });
        }
    },
};
exports.AuthMiddleware = AuthMiddleware;
