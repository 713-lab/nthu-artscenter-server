import { Request, Response } from 'express';
import { Publication, PublicationInterface } from '../models/Publication';
import { UpdateOptions, DestroyOptions } from 'sequelize';
import { Media } from '../models/Media';
import { PublicationService } from "../services/publication.service";

const publicationService = new PublicationService();

export class PublicationsController {

  public index = async (req: Request, res: Response) => {
    try {
      const publications: Publication[] = await publicationService.findAllWithSrc({
        limit: req.query.limit || 12,
        offset: req.query.offset || 0,
        order: [
          ['publish_date', 'DESC'],
        ],
      });
      res.status(200).json(publications);
    }catch(err) {
      // tslint:disable-next-line:no-console
      console.log(err);
      res.status(500).send({
        "message": "index publications error",
      });
    }
  }

  public create = async (req: Request, res: Response) => {
    try {
      const params: PublicationInterface = req.body;
      let publication = await Publication.create < Publication > (params);
      publication = await publicationService.findByPkWithSrc(publication.id);
      res.status(201).json(publication);
    }catch(err) {
      // tslint:disable-next-line:no-console
      console.log(err);
      res.status(500).send({
        "message": "create publication error",
      });
    }
  }

  public show = async (req: Request, res: Response) => {
    try {
      const publication_id: string = req.params.id;
      const publication: Publication | null = await publicationService.findByPkWithSrc(publication_id);
      if(!publication){ throw Error(`show publicationId=${req.params.id} error`);}
      res.status(200).json(publication);
    } catch(err) {
      // tslint:disable-next-line:no-console
      console.log(err);
      res.status(500).send({
        "message": err.message,
      });
    }
  }

  public update = async (req: Request, res: Response) => {
    try{
      const publication_id: string = req.params.id;
      const params: PublicationInterface = req.body;

      const options: UpdateOptions = {
        where: {
          id: publication_id,
        },
        limit: 1,
      };
      await Publication.update(params, options);
      res.status(202).json({
        message: `update publicationId=${req.params.id} success`,
      });
    }catch(err) {
      res.status(500).json({
        message: `update publicationId=${req.params.id} error`,
      });
    }
  }

  public delete = async (req: Request, res: Response) => {
    try {
      const publication_id: string = req.params.id;
      const options: DestroyOptions = {
        where: {
          id: publication_id,
        },
        limit: 1,
      };

      await Publication.destroy(options);
      res.status(201).json({
        message: `delete publicationId=${req.params.id} success`,
      });
    }catch(err) {
      res.status(500).json({
        message: `delete publicationId=${req.params.id} error`,
      });
    }
  }

}