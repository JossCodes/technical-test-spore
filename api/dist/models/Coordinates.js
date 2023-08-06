"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
class Coordinates extends sequelize_1.Model {
}
Coordinates.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    latitude: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    longitude: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    tableName: "coordinates",
    sequelize: database_1.sequelize,
});
exports.default = Coordinates;
