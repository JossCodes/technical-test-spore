import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database";
import User from "./User";
import Coordinates from "./Coordinates";

class Vehicle extends Model {
  public id!: number;
  public userId!: number;
  public name!: string;
  public brand!: string;
  public plates?: string;
  public color?: string;
  public model?: string;
  public image?: string;
  public coordinatesId?: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public readonly user?: User;
  public readonly coordinates?: Coordinates;
}

Vehicle.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    plates: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    coordinatesId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "coordinates",
        key: "id",
      },
    },
  },
  {
    tableName: "vehicles",
    sequelize,
  }
);

Vehicle.belongsTo(User, { foreignKey: "userId", as: "user" });
Vehicle.belongsTo(Coordinates, {
  foreignKey: "coordinatesId",
  as: "coordinates",
});

export default Vehicle;
