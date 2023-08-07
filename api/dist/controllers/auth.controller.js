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
exports.AuthController = void 0;
const User_1 = __importDefault(require("../models/User"));
const Role_1 = __importDefault(require("../models/Role"));
const tools_1 = require("../tools");
const AuthController = {
    register: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, email, password, role } = req.body;
            // Verify if all params are provided
            if (!name || !email || !password || !role) {
                return res.status(400).json({
                    error: "Missing params, you have to provide a name, an email, a password and a role to create a user. Verify and try again.",
                });
            }
            // Verify if the user already exists
            if (yield User_1.default.findOne({ where: { email } })) {
                return res.status(400).json({
                    error: `A user with the email '${email}' already exists`,
                });
            }
            // Create the user
            const userRole = yield Role_1.default.findOne({ where: { name: role } });
            if (!userRole) {
                return res.status(400).json({ error: "Role not found" });
            }
            // Hash the password
            const hashedPassword = (0, tools_1.hashPassword)(password);
            // Create user
            const user = yield User_1.default.create({
                name,
                email,
                password: hashedPassword,
                roleId: userRole.id,
            });
            // Generate token
            const token = (0, tools_1.generateToken)({
                id: user.id,
                email,
                name,
                role: userRole,
            });
            // Return success response with token
            return res
                .status(200)
                .json({ message: "User created succesfully", data: { token } });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            // Verify if all params are provided
            if (!email || !password) {
                return res.status(400).json({
                    error: "Missing params, you have to provide an email and a password to login. Verify and try again.",
                });
            }
            // Verify if the user exists
            const user = yield User_1.default.findOne({
                where: { email },
                include: { model: Role_1.default, as: "role" },
            });
            if (!user) {
                return res.status(400).json({
                    error: `A user with the email '${email}' doesn't exists`,
                });
            }
            // Verify if the password is correct
            const isPasswordCorrect = (0, tools_1.comparePassword)(password, user.password);
            if (!isPasswordCorrect) {
                return res.status(400).json({ error: "Incorrect password" });
            }
            if (!user.role) {
                return res.status(400).json({
                    error: "User doesn't have a role, please contact the administrator",
                });
            }
            // Generate token
            const token = (0, tools_1.generateToken)({
                id: user.id,
                email,
                name: user.name,
                role: user.role,
            });
            // Return success response with token
            return res
                .status(200)
                .json({ message: "Login success", data: { token } });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }),
    verifyIfTokenIsValid: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Verify if token is valid and if has not expired
            const { token } = req.body;
            if (!token)
                return res.status(400).json({ error: "Missing token" });
            const decodedToken = (0, tools_1.verifyToken)(token);
            if (!decodedToken)
                return res.status(400).json({ error: "Invalid token" });
            return res.status(200).json({ message: "Token is valid" });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }),
};
exports.AuthController = AuthController;
