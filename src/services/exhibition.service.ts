import { MediaService }from "./media.service";
import { Exhibition } from "../models/Exhibition";

const mediaService = new MediaService();
export class ExhibitionService {

  public findByPkWithSrc = async(exhibitionId) => {
    const exhibition: Exhibition | null = await Exhibition.findByPk(exhibitionId);
    if(!exhibition){ return null; }
    if(exhibition.cover_id){
      const cover = await mediaService.findByPkWithSrc(exhibition.cover_id);
      exhibition.setDataValue('cover', cover);
    }
    const medias = await mediaService.findAllWithSrc({
      where: {
        exhibition_id: exhibition.id,
      },
    });
    exhibition.setDataValue('media', medias);
    return exhibition;
  }
  public findAllWithSrc = async(params) => {
    const exhibitions = await Exhibition.findAll(params);
    for(const exhibition of exhibitions) {
      if(exhibition.cover_id){
        const cover = await mediaService.findByPkWithSrc(exhibition.cover_id);
        exhibition.setDataValue('cover', cover);
      }
      const medias = await mediaService.findAllWithSrc({
        where: {
          exhibition_id: exhibition.id,
        },
      });
      exhibition.setDataValue('media', medias);
    }
    return exhibitions;
  }
}