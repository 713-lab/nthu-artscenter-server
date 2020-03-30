import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { db } from '../config/database'
import { Media } from '../models/Media'

class Exhibition extends Model {
  public id!: number;
  public type!: string;
  public title!: string;
  public subtitle!: string;
  public description!: string;
  public host!: string;
  public performer!: string;
  public location!: string;
  public start_date!: Date;
  public end_date!: Date;
  public daily_start_time!: Date;
  public daily_end_time!: Date;
  public ticket_info!: string;
  public registration_link!: string;

  public en_title!: string;
  public en_subtitle!: string;
  public en_description!: string;
  public en_host!: string;
  public en_performer!: string;
  public en_location!: string;
  public en_ticket_info!: string;

  public isActive!: boolean;

  public cover_id!: number;
  public cover!: any;
  public media!: any;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

interface ExhibitionInterface {
  id: number;
  type: string;
  title: string;
  subtitle: string;
  description: string;
  host: string;
  performer: string;
  location: string;
  start_date: Date;
  end_date: Date;
  daily_start_time: Date;
  daily_end_time: Date;
  ticket_info: string;
  registration_link: string;

  en_title: string;
  en_subtitle: string;
  en_description: string;
  en_host: string;
  en_performer: string;
  en_location: string;
  en_ticket_info: string;

  isActive: boolean;

  cover_id: number;
  cover: any;
  media: any;
}

Exhibition.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  subtitle: DataTypes.STRING,
  description: DataTypes.TEXT,
  host: DataTypes.STRING,
  performer: DataTypes.STRING,
  location: DataTypes.STRING,
  start_date: DataTypes.DATEONLY,
  end_date: DataTypes.DATEONLY,
  daily_start_time: DataTypes.TIME,
  daily_end_time: DataTypes.TIME,
  ticket_info: DataTypes.STRING,
  registration_link: DataTypes.STRING,

  en_title: DataTypes.STRING,
  en_subtitle: DataTypes.STRING,
  en_description: DataTypes.TEXT,
  en_host: DataTypes.STRING,
  en_performer: DataTypes.STRING,
  en_location: DataTypes.STRING,
  en_ticket_info: DataTypes.STRING,

  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }

  }, 
  {
    sequelize: db,
    tableName: 'exhibition',
  },
);

Exhibition.hasMany(Media, {
  sourceKey: "id",
  foreignKey: "exhibition_id"
});

Exhibition.belongsTo(Media, {
  as: 'cover',
  foreignKey: "cover_id",
  constraints: false,
});

export { Exhibition, ExhibitionInterface};

