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
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const TABLE_NAME = "vehicles";
module.exports = {
    up: (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.createTable(TABLE_NAME, {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            userId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "users",
                    key: "id",
                },
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            brand: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            plates: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
            },
            color: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
            },
            model: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
            },
            image: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
            },
            coordinatesId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: "coordinates",
                    key: "id",
                },
            },
            createdAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
            },
        });
    }),
    down: (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.dropTable(TABLE_NAME);
    }),
};
