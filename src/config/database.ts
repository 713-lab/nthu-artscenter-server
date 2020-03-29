import {
  Sequelize,
} from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const db = new Sequelize({
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "artscenter",
  username: process.env.DB_USERNAME || "testuser",
  password: process.env.DB_PASSWORD || "testuser",
  dialect: "postgres",
  logging: false,
});

export {
  db,
};