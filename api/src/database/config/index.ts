import { Dialect } from "sequelize/types";
import dotenv from "dotenv";
dotenv.config();

interface Config {
  development: {
    username: string;
    password: string | undefined;
    database: string;
    host: string;
    dialect: Dialect;
  };
}

const config: Config = {
  development: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "postgres",
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
  },
};

module.exports = config;
