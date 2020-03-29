import { Request, Response } from 'express';
import { Information, InformationInterface } from '../models/Information';
import { UpdateOptions, DestroyOptions } from 'sequelize';
import { Media } from '../models/Media';


export class InformationsController {
  public async index(req: Request, res: Response) {
    try {
      const informations = await Information.findAll < Information > ({
        limit: req.query.limit || 12,
        offset: req.query.offset || 0,
        order: ['id'],
      });
      for(const information of informations) {
        const medias = await Media.findAll({
          where: {
            information_id: information.id,
          },
        });
        information.setDataValue('media', medias);
      }
      res.json(informations);
    }catch(err) {
      res.status(500).json(err);
    }
  }

  public create(req: Request, res: Response) {
    const params: InformationInterface = req.body;

    Information.create < Information > (params)
      .then((information: Information) => res.status(201).json(information))
      .catch((err: Error) => res.status(500).json(err));
  }

  public async show(req: Request, res: Response) {
    try {
      const information_id: string = req.params.id;
      const information: Information | null = await Information.findByPk < Information > (information_id);
      // tslint:disable-next-line:no-console
      if (information) {
        if(information.cover_id){
          const cover = await Media.findByPk(information.cover_id);
          // tslint:disable-next-line:no-console
          console.log(cover);
          information.setDataValue('cover', cover);
        }
        const medias = await Media.findAll({
          where: {
            information_id: information.id,
          },
        });
        information.setDataValue('media', medias);
        return res.json(information);
      }
      else { res.status(404); }


    } catch(err) {
      return res.status(500).json(err);
    }
  }

  public async update(req: Request, res: Response) {
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
        message: "OK",
      });
      }catch(err) {
        res.status(500).send({
          error: err,
        });
      }

  }

  public delete(req: Request, res: Response) {
    const information_id: string = req.params.id;
    const options: DestroyOptions = {
      where: {
        id: information_id,
      },
      limit: 1,
    };

    Information.destroy(options)
      .then(() => res.status(204).json({
        message: "success",
      }))
      .catch((err: Error) => res.status(500).json(err));
  }



}