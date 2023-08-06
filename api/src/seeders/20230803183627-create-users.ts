import { QueryInterface } from "sequelize";
import User from "../models/User";
import Role from "../models/Role";
import { hashPassword } from "../tools";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const superUserRole = await Role.findOne({ where: { name: "superuser" } });
    const userRole = await Role.findOne({ where: { name: "user" } });

    if (!superUserRole || !userRole) throw new Error("Roles not found");

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
      const hashedPassword = hashPassword(user.password);
      return { ...user, password: hashedPassword };
    });

    await User.bulkCreate(hashedUsers);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete("users", {});
  },
};
