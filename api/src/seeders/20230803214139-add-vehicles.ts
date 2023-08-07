import { QueryInterface } from "sequelize";
import Vehicle from "../models/Vehicle";
import User from "../models/User";
import Coordinates from "../models/Coordinates";

const VEHICLES = [
  {
    name: "Mi carro eléctrico",
    brand: "Tesla",
    plates: "ABC123",
    color: "Rojo",
    model: "Model 3",
    image:
      "https://www.tesla.com/sites/default/files/model3-new/social/model-3-hero-social.jpg",
  },
  {
    name: "Mi Automovil",
    brand: "Maserait",
    plates: "XYZ789",
    color: "Negro",
    model: "Levante",
    image: "https://www.maseratimexico.com/img/navbar/LEVANTE-nav.jpeg",
  },
];

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const users = await User.findAll({ limit: 2 });
    const coordinates = await Coordinates.findAll({ limit: 2 });
    const userIds = users.map((user) => user.id);
    const coordinatesIds = coordinates.map((coordinate) => coordinate.id);
    const vehicles = VEHICLES.map((vehicle, i) => ({
      ...vehicle,
      userId: userIds[i],
      coordinatesId: coordinatesIds[i],
    }));
    await Vehicle.bulkCreate(vehicles);
  },

  down: async (queryInterface: QueryInterface) => {
    await Vehicle.destroy({ where: {} });
  },
};
