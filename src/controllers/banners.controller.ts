import { Request, Response } from 'express';
import {
  Banner,
  BannerInterface,
} from '../models/Banner';
import {
  UpdateOptions,
  DestroyOptions,
} from 'sequelize';

import { BannerService } from '../services/banner.service';

const bannerService = new BannerService();

export class BannersController {
  /**
   * Return Banner list
   *
   *
   * @return {Banners[] | null}
   */
  public index = async (_req: Request, res: Response) => {
    try {
      const banners: Banner[]= await bannerService.findAllWithSrc({});
      res.status(201).json(banners);
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.log(err);
      res.status(500).send({
        message: "index banners error",
      });
    }
  }

  public create = async (req: Request, res: Response): Promise < Banner | void > => {
    try {
      const params: BannerInterface = req.body;
      let banner: Banner | null = await Banner.create < Banner > (params);
      banner = await bannerService.findByPkWithSrc(banner.id);
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
      const banner: Banner | null = await bannerService.findByPkWithSrc(banner_id);

      if (!banner) {
        throw Error(`BannerId=${banner_id} not found`);
      }
      res.status(201).json(banner);
    } catch (err) {
      res.status(500).send({
        message: err.message,
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
        message: `update bannerId=${banner_id} success`,
      });
    } catch (err) {
      res.status(500).send({
        message: `update bannerId=${req.params.id} error`,
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
        "message": `delete bannerID=${req.params.id} error`,
      });
    }

  }
}