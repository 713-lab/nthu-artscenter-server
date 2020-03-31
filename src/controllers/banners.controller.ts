import {
  Request,
  Response,
} from 'express';
import {
  Banner,
  BannerInterface,
} from '../models/Banner';
import {
  UpdateOptions,
  DestroyOptions,
} from 'sequelize';
import {
  Media,
} from '../models/Media';
import {
  Exhibition,
} from '../models/Exhibition';



export class BannersController {

  /**
   * Return Banner list
   *
   *
   * @return {Banners[] | null}
   */
  public index = async (_req: Request, res: Response) => {
    try {
      const banners: Banner[] | null = await Banner.findAll < Banner > ({});
      if (!banners) {
        res.status(201).json();
      }
      for (const banner of banners) {
        if (banner.cover_id) {
          const cover: Media | null = await Media.findByPk(banner.cover_id);
          if (cover) {
            banner.setDataValue('cover', cover);
          }
        }
        if (banner.cover_mobile_id) {
          const coverMobile: Media | null = await Media.findByPk(banner.cover_mobile_id);
          if (coverMobile) {
            banner.setDataValue('cover_mobile', coverMobile);
          }
        }
        if (banner.exhibition_id) {
          const exhibition: Exhibition | null = await Exhibition.findByPk(banner.exhibition_id);
          if (exhibition) {
            banner.setDataValue('exhibition', exhibition);
          }
        }
      }
      res.status(201).json(banners);
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.log(err);
      res.status(500).send({
        messages: "index banners error",
      });
    }
  }

  public create = async (req: Request, res: Response): Promise < Banner | void > => {
    try {
      const params: BannerInterface = req.body;
      const banner: Banner | null = await Banner.create < Banner > (params);

      if (banner.cover_id) {
        const cover: Media | null = await Media.findByPk(banner.cover_id);
        if (cover) {
          banner.setDataValue('cover', cover);
        }
      }
      if (banner.cover_mobile_id) {
        const coverMobile: Media | null = await Media.findByPk(banner.cover_mobile_id);
        if (coverMobile) {
          banner.setDataValue('cover_mobile', coverMobile);
        }
      }
      if (banner.exhibition_id) {
        const exhibition: Exhibition | null = await Exhibition.findByPk(banner.exhibition_id);
        if (exhibition) {
          banner.setDataValue('exhibition', exhibition);
        }
      }
      res.status(201).json(banner);
    } catch (err) {
      res.status(500).send({
        "message": "create banner error",
      });
    }
  }

  public show = async (req: Request, res: Response) => {
    try {
      const banner_id: string = req.params.id;
      const banner: Banner | null = await Banner.findByPk < Banner > (banner_id);

      if (!banner) {
        throw Error(`BannerId=${banner_id} not found`);
      }

      if (banner.cover_id) {
        const cover: Media | null = await Media.findByPk(banner.cover_id);
        if (cover) {
          banner.setDataValue('cover', cover);
        }
      }
      if (banner.cover_mobile_id) {
        const coverMobile: Media | null = await Media.findByPk(banner.cover_mobile_id);
        if (coverMobile) {
          banner.setDataValue('cover_mobile', coverMobile);
        }
      }
      if (banner.exhibition_id) {
        const exhibition: Exhibition | null = await Exhibition.findByPk(banner.exhibition_id);
        if (exhibition) {
          banner.setDataValue('exhibition', exhibition);
        }
      }
      res.status(201).json(banner);
    } catch (err) {
      res.status(500).send({
        messages: err.message,
      });
    }
  }

  public update = async (req: Request, res: Response) => {
    try {
      const banner_id: string = req.params.id;
      const params: BannerInterface = req.body;

      const options: UpdateOptions = {
        where: {
          id: banner_id,
        },
        limit: 1,
      };

      await Banner.update(params, options);
      res.status(201).send({
        messages: `update bannerId=${banner_id} success`,
      });
    } catch (err) {
      res.status(500).send({
        messages: `update bannerId=${req.params.id} error`,
      });
    }

  }

  public delete = async (req: Request, res: Response) => {
    try {
      const banner_id: string = req.params.id;
      const options: DestroyOptions = {
        where: {
          id: banner_id,
        },
        limit: 1,
      };

      await Banner.destroy(options);
      res.status(204).json({
        message: `delete bannerID=${banner_id} success`,
      });
    } catch (err) {
      res.status(500).send({
        "messages": `delete bannerID=${req.params.id} error`,
      });
    }

  }
}