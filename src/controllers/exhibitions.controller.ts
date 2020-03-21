import { Request, Response } from 'express';
import { Exhibition, ExhibitionInterface } from '../models/Exhibition'
import { UpdateOptions, DestroyOptions } from 'sequelize'
import { Media } from '../models/Media';


export class ExhibitionsController {

  public index(_req: Request, res: Response) {
    Exhibition.findAll < Exhibition > ({})
      .then((Exhibitions: Exhibition[]) => res.json(Exhibitions))
      .catch((err: Error) => res.status(500).json(err))
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
        return res.json(exhibition);
      }
      else { res.status(404); }


    } catch(err) {
      return res.status(500).json(err);
    }
  }

  public update(req: Request, res: Response) {
    const exhibitionId: string = req.params.id
    const params: ExhibitionInterface = req.body

    const options: UpdateOptions = {
      where: {
        id: exhibitionId
      },
      limit: 1
    }

    Exhibition.update(params, options)
      .then(() => res.status(202).json({
        data: "success"
      }))
      .catch((err: Error) => res.status(500).json(err))
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