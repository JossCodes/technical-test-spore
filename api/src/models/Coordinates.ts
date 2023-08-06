import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database";

class Coordinates extends Model {
  public id!: number;
  public latitude!: number;
  public longitude!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Coordinates.init(
  {
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
  },
  {
    tableName: "coordinates",
    sequelize,
  }
);

export default Coordinates;
