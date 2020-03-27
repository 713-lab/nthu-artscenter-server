import { Request, Response } from 'express';
import { Exhibition, ExhibitionInterface } from '../models/Exhibition'
import { UpdateOptions, DestroyOptions } from 'sequelize'
import { Media } from '../models/Media';


export class ExhibitionsController {

  public async index(req: Request, res: Response) {
    try {
      const exhibitions = await Exhibition.findAll < Exhibition > ({
        limit: req.query.limit || 12,
        offset: req.query.offset || 0,
        order: ['id']
      })
      for(const exhibition of exhibitions){
        const medias = await Media.findAll({
          where: {
            exhibitionId:  exhibition.id
          }
        });
        exhibition.setDataValue('media', medias);
      }
      res.json(exhibitions);
    }catch(err){
      res.status(500).json(err);
    }
  }

  public create(req: Request, res: Response) {
    const params: ExhibitionInterface = req.body

    Exhibition.create < Exhibition > (params)
      .then((exhibition: Exhibition) => res.status(201).json(exhibition))
      .catch((err: Error) => res.status(500).json(err))
  }

  public async show(req: Request, res: Response) {
    try {
      const exhibitionId: string = req.params.id
      const exhibition: Exhibition | null = await Exhibition.findByPk < Exhibition > (exhibitionId);
      // tslint:disable-next-line:no-console
      if (exhibition) {
        if(exhibition.coverId){
          const cover = await Media.findByPk(exhibition.coverId);
          // tslint:disable-next-line:no-console
          console.log(cover);
          exhibition.setDataValue('cover', cover);
        }
        const medias = await Media.findAll({
          where: {
            exhibitionId: exhibition.id
          }
        });
        exhibition.setDataValue('media', medias);
        return res.json(exhibition);
      }
      else { res.status(404); }


    } catch(err) {
      return res.status(500).json(err);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const exhibitionId: string = req.params.id
      const params: ExhibitionInterface = req.body

      const options: UpdateOptions = {
        where: {
          id: exhibitionId
        },
        limit: 1
      }

      await Exhibition.update(params, options)
      res.status(202).json({
        data: "success"
      })
    }catch(err){
      res.status(500).json(err)
    }
    
  }

  public delete(req: Request, res: Response) {
    const exhibitionId: string = req.params.id
    const options: DestroyOptions = {
      where: {
        id: exhibitionId
      },
      limit: 1
    }

    Exhibition.destroy(options)
      .then(() => res.status(204).json({
        data: "success"
      }))
      .catch((err: Error) => res.status(500).json(err))
  }
}