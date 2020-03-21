import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";

export class User extends Model {
  public id!: number;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

