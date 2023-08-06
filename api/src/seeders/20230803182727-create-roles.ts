import { QueryInterface } from "sequelize";

const roles = [
  {
    name: "superuser",
  },
  {
    name: "user",
  },
];

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert("roles", roles);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete("roles", {});
  },
};
