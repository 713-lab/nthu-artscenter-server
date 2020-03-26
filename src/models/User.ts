import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { db } from '../config/database';
import bcrypt from 'bcrypt';

const saltRounds = 10;

const hashPassword = async (user: User) => {
  try {
    if(!user.changed('password')){
      return;
    }
    const hash = await bcrypt.hash(user.password, saltRounds);
    user.setDataValue('password', hash);
  }catch(err) {
    throw new Error('Sequelize hash password fail')
  }
  
}

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
  name: {
    type: DataTypes.STRING,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }

}, 
{
  hooks: {
    beforeCreate: hashPassword,
    beforeUpdate: hashPassword,
  },
  sequelize: db,
  tableName: 'user',
});



