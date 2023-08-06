import { QueryInterface, DataTypes } from "sequelize";

const TABLE_NAME = "coordinates";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable(TABLE_NAME, {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      longitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable(TABLE_NAME);
  },
};
