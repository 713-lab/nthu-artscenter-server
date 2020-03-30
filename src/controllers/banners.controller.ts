import { Request, Response } from 'express';
import { Banner, BannerInterface } from '../models/Banner';
import { UpdateOptions, DestroyOptions } from 'sequelize';
import { Media } from '../models/Media';
import { Exhibition } from '../models/Exhibition';



export class BannersController {

  /**
   * Return Banner list
   *
   *
   * @return {Banners[] | null}
   */
  public async index(req: Request, res: Response) {
    try {
      const banners: Banner[] | null = await Banner.findAll < Banner > ({});
      if(!banners){ return res.status(201).json({});}
      for(const banner of banners) {
        // tslint:disable-next-line:no-console
        // console.log(banner);
        if(banner.cover_id){
          const cover: Media | null = await Media.findByPk(banner.cover_id);
          if(cover){ banner.setDataValue('cover', cover);}
        }
        if(banner.cover_mobile_id){
          const coverMobile: Media = await Media.findByPk(banner.cover_mobile_id);
          if(coverMobile){ banner.setDataValue('cover_mobile', coverMobile);}
        }
        if(banner.exhibition_id){
          const exhibition: Exhibition = await Exhibition.findByPk(banner.exhibition_id);
          if(exhibition){ banner.setDataValue('exhibition', exhibition);}
        }
        // tslint:disable-next-line:no-console
        console.log(banner);
      }
      res.status(201).json(banners);
    }catch(err) {
      res.status(500).json(err);
    }
  }

  public create(req: Request, res: Response) {
    const params: BannerInterface = req.body;

    Banner.create < Banner > (params)
      .then((banner: Banner) => res.status(201).json(banner))
      .catch((err: Error) => res.status(500).json(err));
  }

  public async show(req: Request, res: Response) {
    try {
      const banner_id: string = req.params.id;
      const banner: Banner | null = await Banner.findByPk < Banner > (banner_id);
      // tslint:disable-next-line:no-console
      if (banner) {
        if(banner.cover_id){
          const cover = await Media.findByPk(banner.cover_id);
          const coverMobile = await Media.findByPk(banner.cover_mobile_id);
          // tslint:disable-next-line:no-console
          console.log(cover);
          banner.setDataValue('cover', cover);
          banner.setDataValue('cover_mobile', coverMobile);
        }
        return res.json(banner);
      }
      else { res.status(404); }


    } catch(err) {
      return res.status(500).json(err);
    }
  }

  public update(req: Request, res: Response) {
    const banner_id: string = req.params.id;
    const params: BannerInterface = req.body;

    const options: UpdateOptions = {
      where: {
        id: banner_id,
      },
      limit: 1,
    };

    Banner.update(params, options)
      .then(() => res.status(202).json({
        message: "success",
      }))
      .catch((err: Error) => res.status(500).json(err));
  }

  public delete(req: Request, res: Response) {
    const banner_id: string = req.params.id;
    const options: DestroyOptions = {
      where: {
        id: banner_id,
      },
      limit: 1,
    };

    Banner.destroy(options)
      .then(() => res.status(204).json({
        message: "success",
      }))
      .catch((err: Error) => res.status(500).json(err));
  }
}