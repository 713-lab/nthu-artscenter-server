import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { db } from '../config/database'
import { Media } from "./Media";
import { Exhibition } from "./Exhibition";

class Banner extends Model {
  public id!: number;
  public title!: string;
  public subtitle!: string;

  public exhibition_id!: number;
  public exhibition!: any;

  public cover_id!: number;
  public cover!: any;
  public cover_mobile_id!: number;
  public cover_mobile!: any;

  public isActive!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

interface BannerInterface {
  id: number;
  title: string;
  subtitle: string;
  exhibition_id: number;
  cover_id: number;
  cover_mobile_id: number;

  isActive: boolean;
}

Banner.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: DataTypes.STRING,
  subtitle: DataTypes.STRING,
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
  
}, {
  sequelize: db,
  tableName: 'banner',
});

Banner.belongsTo(Media, {
  as: 'cover',
  foreignKey: "cover_id",
  constraints: false,
});

Banner.belongsTo(Media, {
  as: 'covermobile',
  foreignKey: "cover_mobile_id",
  constraints: false,
});

Banner.belongsTo(Exhibition, {
  as: 'exhibition',
  foreignKey: "exhibition_id",
  constraints: false
})

export { Banner, BannerInterface };

