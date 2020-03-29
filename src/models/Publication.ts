import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { db } from '../config/database';
import { Media } from '../models/Media';

class Publication extends Model {
  public id!: number;
  public isbn!: string;
  public name!: string;
  public author!: string;
  public publish_date!: Date;
  public publisher!: string;
  public description!: string;
  public price!: number;
  public spec!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public cover_id!: number;

  public en_name!: string;
  public en_author!: string;
  public en_publisher!: string;
  public en_spec!: string;

  public cover!: any;

}

interface PublicationInterface {
    id: number;
    isbn: string;
    name: string;
    author: string;
    publish_date: Date;
    publisher: string;
    description: string;
    price: number;
    spec: string;
    createdAt: Date;
    updatedAt: Date;
    cover_id: number;
  
    en_name: string;
    en_author: string;
    en_publisher: string;
    en_spec: string;
  
    cover: any;
}

Publication.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  isbn: DataTypes.STRING,
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
      type: DataTypes.STRING,
      allowNull: false
  },
  publish_date: DataTypes.DATEONLY,
  publisher: DataTypes.STRING,
  description: DataTypes.TEXT,
  price: DataTypes.INTEGER,
  spec: DataTypes.STRING,

  en_name: DataTypes.STRING,
  en_author: DataTypes.STRING,
  en_publisher: DataTypes.STRING,
  en_spec: DataTypes.STRING,

  }, 
  {
    sequelize: db,
    tableName: 'publication',
  },
);

Publication.hasMany(Media, {
  sourceKey: "id",
  foreignKey: "publication_id"
});

Publication.belongsTo(Media, {
  as: 'cover',
  foreignKey: "cover_id",
  constraints: false,
});

export { Publication, PublicationInterface };
