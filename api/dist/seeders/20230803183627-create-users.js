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
const User_1 = __importDefault(require("../models/User"));
const Role_1 = __importDefault(require("../models/Role"));
const tools_1 = require("../tools");
module.exports = {
    up: (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
        const superUserRole = yield Role_1.default.findOne({ where: { name: "superuser" } });
        const userRole = yield Role_1.default.findOne({ where: { name: "user" } });
        if (!superUserRole || !userRole)
            throw new Error("Roles not found");
        const users = [
            {
                name: "Super User",
                email: "superuser@example.com",
                password: "12345678",
                roleId: superUserRole.id,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Regular User",
                email: "user@example.com",
                password: "12345678",
                roleId: userRole.id,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];
        const hashedUsers = users.map((user) => {
            const hashedPassword = (0, tools_1.hashPassword)(user.password);
            return Object.assign(Object.assign({}, user), { password: hashedPassword });
        });
        yield User_1.default.bulkCreate(hashedUsers);
    }),
    down: (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.bulkDelete("users", {});
    }),
};
