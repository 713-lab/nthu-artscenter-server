import { Request, Response } from 'express';
import { Publication, PublicationInterface } from '../models/Publication';
import { UpdateOptions, DestroyOptions } from 'sequelize';
import { Media } from '../models/Media';


export class PublicationsController {

  public index = async (_req: Request, res: Response) => {
    try {
      const publications: Publication[] = await Publication.findAll < Publication > ({});
      // tslint:disable-next-line:no-console
      for(const publication of publications) {
        if(publication.cover_id){
          const cover = await Media.findByPk(publication.cover_id);
          publication.setDataValue('cover', cover);
        }
      }
      res.status(200).json(publications);
    }catch(err) {
      // tslint:disable-next-line:no-console
      console.log(err);
      res.status(500).send({
        "messages": "index publications error",
      });
    }
  }

  public create = async (req: Request, res: Response) => {
    try {
      const params: PublicationInterface = req.body;
      const publication = await Publication.create < Publication > (params);
      const cover = await Media.findByPk(publication.cover_id);
      publication.setDataValue('cover', cover);
      res.status(201).json(publication);
    }catch(err) {
      // tslint:disable-next-line:no-console
      console.log(err);
      res.status(500).send({
        "messages": "create publication error",
      });
    }
  }

  public show = async (req: Request, res: Response) => {
    try {
      const publication_id: string = req.params.id;
      const publication: Publication | null = await Publication.findByPk < Publication > (publication_id);
      if(!publication){ throw Error(`show publicationId=${req.params.id} error`);}
      if (publication) {
        if(publication.cover_id){
          const cover = await Media.findByPk(publication.cover_id);
          publication.setDataValue('cover', cover);
        }
      }
      res.status(200).json(publication);
    } catch(err) {
      // tslint:disable-next-line:no-console
      console.log(err);
      res.status(500).send({
        "messages": err.message,
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
        messages: `update publicationId=${req.params.id} error`,
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
        messages: `delete publicationId=${req.params.id} error`,
      });
    }
  }

}