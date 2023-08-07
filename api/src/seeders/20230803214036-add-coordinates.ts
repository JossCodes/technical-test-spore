import { QueryInterface } from "sequelize";
import Coordinates from "../models/Coordinates";

const COORDINATES = [
  {
    latitude: 20.6747883,
    longitude: -103.440668,
  },
  {
    latitude: 20.7078664,
    longitude: 103.4825146,
  },
];

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await Coordinates.bulkCreate(COORDINATES);
  },

  down: async (queryInterface: QueryInterface) => {
    await Coordinates.destroy({ where: {} });
  },
};
