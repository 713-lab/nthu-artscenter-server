import { Request, Response } from 'express';
import { Publication, PublicationInterface } from '../models/Publication'
import { UpdateOptions, DestroyOptions } from 'sequelize'
import { Media } from '../models/Media';


export class PublicationsController {

  public index(_req: Request, res: Response) {
    Publication.findAll < Publication > ({})
      .then((Publications: Publication[]) => res.json(Publications))
      .catch((err: Error) => res.status(500).json(err))
  }

  public create(req: Request, res: Response) {
    const params: PublicationInterface = req.body

    Publication.create < Publication > (params)
      .then((publication: Publication) => res.status(201).json(publication))
      .catch((err: Error) => res.status(500).json(err))
  }

  public async show(req: Request, res: Response) {
    try {
      const publicationId: string = req.params.id
      const publication: Publication | null = await Publication.findByPk < Publication > (publicationId);
      // tslint:disable-next-line:no-console
      if (publication) {
        if(publication.coverId){
          const cover = await Media.findByPk(publication.coverId);
          // tslint:disable-next-line:no-console
          console.log(cover);
          publication.setDataValue('cover', cover);
        }
        return res.json(publication);
      }
      else { res.status(404); }


    } catch(err) {
      return res.status(500).json(err);
    }
  }

  public update(req: Request, res: Response) {
    const publicationId: string = req.params.id
    const params: PublicationInterface = req.body

    const options: UpdateOptions = {
      where: {
        id: publicationId
      },
      limit: 1
    }

    Publication.update(params, options)
      .then(() => res.status(202).json({
        data: "success"
      }))
      .catch((err: Error) => res.status(500).json(err))
  }

  public delete(req: Request, res: Response) {
    const publicationId: string = req.params.id
    const options: DestroyOptions = {
      where: {
        id: publicationId
      },
      limit: 1
    }

    Publication.destroy(options)
      .then(() => res.status(204).json({
        data: "success"
      }))
      .catch((err: Error) => res.status(500).json(err))
  }
}