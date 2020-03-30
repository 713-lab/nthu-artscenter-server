import {
  Sequelize,
} from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const db = new Sequelize({
  dialect: "postgres",
  database: process.env.DB_NAME || "artscenter",
  username: process.env.DB_USERNAME || "testuser",
  password: process.env.DB_PASSWORD || "testuser",
  host: process.env.DB_HOST ||　"localhost",
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  logging: false,
});

export {
  db,
};