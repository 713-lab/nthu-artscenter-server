import { MediaService }from "./media.service";
import { Publication } from "../models/Publication";

const mediaService = new MediaService();
export class PublicationService {

  public findByPkWithSrc = async(publicationId) => {
    const publication: Publication | null = await Publication.findByPk(publicationId);
    if(!publication){ return null; }
    if(publication.cover_id){
      const cover = await mediaService.findByPkWithSrc(publication.cover_id);
      publication.setDataValue('cover', cover);
    }
    const medias = await mediaService.findAllWithSrc({
      where: {
        publication_id: publication.id,
      },
    });
    publication.setDataValue('media', medias);
    return publication;
  }
  public findAllWithSrc = async(params) => {
    const publications = await Publication.findAll(params);
    for(const publication of publications) {
      if(publication.cover_id){
        const cover = await mediaService.findByPkWithSrc(publication.cover_id);
        publication.setDataValue('cover', cover);
      }
      const medias = await mediaService.findAllWithSrc({
        where: {
          publication_id: publication.id,
        },
      });
      publication.setDataValue('media', medias);
    }
    return publications;
  }
}