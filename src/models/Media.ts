import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { db } from '../config/database'
import { UPLOAD_DIR } from "../config/config";

const getMediaSrc = ( media: Media )=> {
  media.setDataValue('src', UPLOAD_DIR + '/' + media.semester + '/' + media.file);
  media.setDataValue('src_cover', UPLOAD_DIR + '/' + media.semester + '/cover_' + media.file);
  media.setDataValue('src_thumb', UPLOAD_DIR + '/' + media.semester + '/thumb_' + media.file);
}

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
  src: DataTypes.STRING,
  src_cover: DataTypes.STRING,
  src_thumb: DataTypes.STRING,
  semester: {
    type: DataTypes.STRING(7),
  },
  note: DataTypes.STRING

}, {
  hooks: {
    beforeUpdate: getMediaSrc,
    beforeCreate: getMediaSrc,
  },
  sequelize: db,
  tableName: 'media',
});

export { Media, MediaInterface };

