import { QueryInterface } from "sequelize";
import Coordinates from "../models/Coordinates";

const COORDINATES = [
  {
    latitude: 20.6450459,
    longitude: -103.4936385,
  },
  {
    latitude: 20.7078714,
    longitude: -103.4129917,
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
