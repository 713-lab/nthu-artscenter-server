import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const db = new Sequelize({
  database: process.env.DB_NAME || "artscenter",
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "",
  dialect: "postgres",
  logging: false,
});