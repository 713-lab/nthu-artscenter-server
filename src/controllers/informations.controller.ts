import { Request, Response } from 'express';
import { Information, InformationInterface } from '../models/Information';
import { UpdateOptions, DestroyOptions } from 'sequelize';
import { Media } from '../models/Media';


export class InformationsController {
  public index = async (req: Request, res: Response) => {
    try {
      const informations = await Information.findAll < Information > ({
        limit: req.query.limit || 12,
        offset: req.query.offset || 0,
        order: [
          ['start_date', 'DESC'],
        ],
      });

      for(const information of informations) {
        if(information.cover_id){
          const cover = await Media.findByPk(information.cover_id);
          if(cover){ information.setDataValue('cover', cover);}
        }

      }
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
      const information = await Information.create < Information > (params);
      if(information.cover_id){
        const cover = await Media.findByPk(information.cover_id);
        if(cover){ information.setDataValue('cover', cover);}
      }
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
      const information: Information | null = await Information.findByPk < Information > (information_id);
      // tslint:disable-next-line:no-console
      if(!information){ throw Error(`informationId=${req.params.id} not found`);}
      if (information) {
        if(information.cover_id){
          const cover = await Media.findByPk(information.cover_id);
          // tslint:disable-next-line:no-console
          console.log(cover);
          information.setDataValue('cover', cover);
        }
        return res.json(information);
      }
    } catch(err) {
      return res.status(500).json({
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