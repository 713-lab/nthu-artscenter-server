import { MediaService }from "./media.service";
import { Media } from "../models/Media";
import { Information } from "../models/Information";

const mediaService = new MediaService();

export class InformationService {

  public findByPkWithSrc = async(informationId: string | number) => {
    const information = await Information.findByPk(informationId);
    if (information.cover_id) {
      const cover: Media | null = await mediaService.findByPkWithSrc(information.cover_id);
      information.setDataValue('cover', cover);
    }
    return information;
  }

  public findAllWithSrc = async(params) => {
    const informations = await Information.findAll(params);
    for(const information of informations) {
      if (information.cover_id) {
        const cover: Media | null = await mediaService.findByPkWithSrc(information.cover_id);
        information.setDataValue('cover', cover);
      }
    }
    return informations;
  }
}

