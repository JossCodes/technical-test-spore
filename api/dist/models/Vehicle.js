"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
const User_1 = __importDefault(require("./User"));
const Coordinates_1 = __importDefault(require("./Coordinates"));
class Vehicle extends sequelize_1.Model {
}
Vehicle.init({
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
}, {
    tableName: "vehicles",
    sequelize: database_1.sequelize,
});
Vehicle.belongsTo(User_1.default, { foreignKey: "userId", as: "user" });
Vehicle.belongsTo(Coordinates_1.default, {
    foreignKey: "coordinatesId",
    as: "coordinates",
});
exports.default = Vehicle;
