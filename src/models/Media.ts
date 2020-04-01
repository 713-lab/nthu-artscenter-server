import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { db } from '../config/database'

class Media extends Model {
  public id!: number;
  public file!: string;
  public note!: string;
  public semester!: Date;

  public exhibition_id!: number;
  public publication_id!: number;

  public src!: string;
  public src_cover!: string;
  public src_thumb!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

interface MediaInterface {
  id: number;
  file: string;
  note: string;
  semester: Date;
  exhibition_id: number;
  publication_id: number;
  src: string;
  src_cover: string;
  src_thumb: string;
}

Media.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  file: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  semester: {
    type: DataTypes.STRING(7),
  },
  note: DataTypes.STRING

}, {
  hooks: {
    
  },
  sequelize: db,
  tableName: 'media',
});

export { Media, MediaInterface };

