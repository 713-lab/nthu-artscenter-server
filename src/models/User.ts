import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { db } from '../config/database';

export class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public isAdmin!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export interface MediaInterface {
  id: number;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: DataTypes.STRING

}, {
  sequelize: db,
  tableName: 'user',
});



