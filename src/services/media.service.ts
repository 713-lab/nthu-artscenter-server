import { Media } from "../models/Media";
import { STATIC_UPLOADS_API } from "../config/constant";

export class MediaService {
  public findByPkWithSrc = async (mediaId: number | string) => {
    const media: Media | null = await Media.findByPk(mediaId);
    if(!media)  return null;
    media.setDataValue('src', STATIC_UPLOADS_API + '/' + media.semester + '/' + media.file);
    media.setDataValue('src_cover', STATIC_UPLOADS_API + '/' + media.semester + '/cover_' + media.file);
    media.setDataValue('src_thumb', STATIC_UPLOADS_API + '/' + media.semester + '/thumb_' + media.file);
    return media;
  }

  public findAllWithSrc = async (params) => {
    const medias: Media [] = await Media.findAll(params);
    for(const media of medias) {
      media.setDataValue('src', STATIC_UPLOADS_API + '/' + media.semester + '/' + media.file);
      media.setDataValue('src_cover', STATIC_UPLOADS_API + '/' + media.semester + '/cover_' + media.file);
      media.setDataValue('src_thumb', STATIC_UPLOADS_API + '/' + media.semester + '/thumb_' + media.file);
    }
    return medias;
  }
}
