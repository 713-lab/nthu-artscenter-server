import {
  Request,
  Response,
} from 'express';
import {
  Exhibition,
  ExhibitionInterface,
} from '../models/Exhibition';
import {
  UpdateOptions,
  DestroyOptions,
} from 'sequelize';
import { ExhibitionService } from '../services/exhibition.service';

const exhibitionService = new ExhibitionService();
export class ExhibitionsController {

  public index = async (req: Request, res: Response) => {
    try {
      const typeOfArt = req.query.typeOfArt;
      const year = req.query.year;
      const searchStr = req.query.searchStr;
      let exhibitions: Exhibition[];
      if (!typeOfArt && !year && !searchStr) {
        exhibitions = await exhibitionService.findAllWithSrc({
          limit: req.query.limit || 12,
          offset: req.query.offset || 0,
          order: [
            ['start_date', 'DESC'],
          ],
        });
      } else {
        exhibitions = await exhibitionService.findAllWithSrc({});
        if (typeOfArt) {
          exhibitions = exhibitions.filter((item) => {
            return item.type === typeOfArt;
          });
        }
        if (year) {
          exhibitions = exhibitions.filter((item) => {
            // not finish yet
            const startDate: Date = new Date(item.start_date);
            const lowBound: Date = new Date();
            const upBound: Date = new Date();
            lowBound.setFullYear(year, 0, 1);
            upBound.setFullYear(year, 11, 31);
            return lowBound.getTime() < startDate.getTime() && upBound.getTime() > startDate.getTime();
          });
        }
        if (searchStr) {
          exhibitions = exhibitions.filter((item) => {
            const patt = new RegExp(searchStr);
            return patt.test(item.title) || patt.test(item.performer);
          });
        }
      }
      res.json(exhibitions);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  public create = async (req: Request, res: Response) => {
    try {
      const params: ExhibitionInterface = req.body;
      let exhibition = await Exhibition.create < Exhibition > (params);
      exhibition = await exhibitionService.findByPkWithSrc(exhibition.id);
      res.status(201).json(exhibition);
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.log(err);
      res.status(500).json("create exhibition error");
    }
  }

  public show = async (req: Request, res: Response) => {
    try {
      const exhibition_id: string = req.params.id;
      const exhibition: Exhibition | null = await exhibitionService.findByPkWithSrc(exhibition_id);
      if(!exhibition){ throw Error(`not found exhibitionId=${req.params.id}`);}
      res.status(200).json(exhibition);
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  }

  public update = async (req: Request, res: Response) => {
    try {
      const exhibition_id: string = req.params.id;
      const params: ExhibitionInterface = req.body;

      const options: UpdateOptions = {
        where: {
          id: exhibition_id,
        },
        limit: 1,
      };

      await Exhibition.update(params, options);
      res.status(202).json({
        message: `update exhibitionId=${req.params.id} success`,
      });
    } catch (err) {
      res.status(500).json({
        message: `update exhibitionId=${req.params.id} error`,
      });
    }

  }

  public delete = async (req: Request, res: Response) => {
    try {
      const exhibition_id: string = req.params.id;
      const options: DestroyOptions = {
        where: {
          id: exhibition_id,
        },
        limit: 1,
      };

      await Exhibition.destroy(options);
      res.status(204).json({});
    }catch(err) {
      res.status(500).json({
        message: `delete exhibitionId=${req.params.id} error`,
      });
    }
  }
}