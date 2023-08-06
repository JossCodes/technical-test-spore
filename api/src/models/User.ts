import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database";
import Role from "./Role";

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public roleId!: number;
  public readonly role?: Role;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    sequelize,
  }
);

User.belongsTo(Role, { foreignKey: "roleId", as: "role" });

export default User;
