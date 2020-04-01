import { Request, Response } from 'express';
import { Information, InformationInterface } from '../models/Information';
import { UpdateOptions, DestroyOptions } from 'sequelize';
import { InformationService } from '../services/information.service';

const informationService = new InformationService();

export class InformationsController {

  public index = async (req: Request, res: Response) => {
    try {
      const informations = await informationService.findAllWithSrc({
        limit: req.query.limit || 12,
        offset: req.query.offset || 0,
        order: [
          ['start_date', 'DESC'],
        ],
      });
      res.status(200).json(informations);
    }catch(err) {
      // tslint:disable-next-line:no-console
      console.log(err);
      res.status(500).json({
        message: "index informations error",
      });
    }
  }

  public create = async (req: Request, res: Response) => {
    try{
      const params: InformationInterface = req.body;
      let information = await Information.create < Information > (params);
      information = await informationService.findByPkWithSrc(information.id);
      res.status(201).json(information);
    }catch(err) {
      res.status(500).json({
        message: "create information error",
      });
    }
  }

  public show = async (req: Request, res: Response) => {
    try {
      const information_id: string = req.params.id;
      const information: Information | null = await informationService.findByPkWithSrc(information_id);
      // tslint:disable-next-line:no-console
      if(!information){ throw Error(`informationId=${req.params.id} not found`);}
      res.json(information);
    } catch(err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }

  public update = async (req: Request, res: Response) => {
    try {
      const information_id: string = req.params.id;
      const params: InformationInterface = req.body;

      const options: UpdateOptions = {
        where: {
          id: information_id,
        },
        limit: 1,
      };

      await Information.update(params, options);
      res.status(202).send({
        message: `update informationId=${req.params.id} success`,
      });
      }catch(err) {
        res.status(500).send({
          message: `update informationId=${req.params.id} error`,
        });
      }

  }

  public delete = async (req: Request, res: Response) => {
    try {
      const information_id: string = req.params.id;
      const options: DestroyOptions = {
        where: {
          id: information_id,
        },
        limit: 1,
      };

      await Information.destroy(options);
      res.status(204).json({
        message: `delete informationId=${req.params.id} success`,
      });
    } catch(err) {
      res.status(500).json({
        message: `delete informationId=${req.params.id} error`,
      });
    }

  }



}