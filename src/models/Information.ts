import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { db } from '../config/database';
import { Media } from './Media';

export class Information extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public start_date!: Date;
  public isActive!: boolean;

  public en_title!: string;
  public en_description!: string;

  public cover!: any;
  public media!: any;
  public coverId!: number;

}

export interface InformationInterface {
    id: number;
    title: string;
    description: string;
    start_date: string;
    isActive: boolean;

    en_title: string;
    en_description: string;
  
    cover: any;
    media: any;
    coverId: number;
}

Information.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  start_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  description: DataTypes.TEXT,
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  en_title: DataTypes.STRING,
  en_description: DataTypes.TEXT,
  }, 
  {
    sequelize: db,
    tableName: 'information',
  },
);

Information.hasMany(Media, {
  sourceKey: "id",
  foreignKey: "informationId"
});

Information.belongsTo(Media, {
  as: 'cover',
  constraints: false,
});

