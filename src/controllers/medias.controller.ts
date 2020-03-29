import { Request, Response } from 'express';
import { Media, MediaInterface } from '../models/Media';
import { UpdateOptions, DestroyOptions } from 'sequelize';
import * as path from 'path';
import { UPLOAD_DIR } from '../config/config';
import { storeTwoSizePic, moveTmpFilesToRightFolder, generateIndexFolder } from '../utils/sharp';


export class MediasController {

  public async index(_req: Request, res: Response) {
    try {
      const medias: Media[] = await Media.findAll < Media > ({
        limit: _req.query.limit || 12,
        offset: _req.query.offset || 0,
        order: ['id'],
      });
      for(const media of medias) {
        media.setDataValue('src', UPLOAD_DIR + '/' + media.semester + '/' + media.file);
        media.setDataValue('src_cover', UPLOAD_DIR + '/' + media.semester + '/cover_' + media.file);
        media.setDataValue('src_thumb', UPLOAD_DIR + '/' + media.semester + '/thumb_' + media.file);
      }
      res.send(medias);
    } catch(err) {
      res.status(500).send({message: err});
    }
  }

  public create(req: Request, res: Response) {
    const request = req.body;
    request.file = req.file.filename;
    const params: MediaInterface = request;

    Media.create < Media > (params)
      .then((media: Media) => res.status(201).json(media))
      .catch((err: Error) => res.status(500).json(err));
  }

  public show(req: Request, res: Response) {
    const media_id: string = req.params.id;

    Media.findByPk < Media > (media_id)
      .then((media: Media | null) => {
        if (media) {
          media.setDataValue('src', UPLOAD_DIR + '/' + media.semester + '/' + media.file);
          media.setDataValue('src_cover', UPLOAD_DIR + '/' + media.semester + '/cover_' + media.file);
          media.setDataValue('src_thumb', UPLOAD_DIR + '/' + media.semester + '/thumb_' + media.file);
          res.json(media);
        } else {
          res.status(404).json({
            errors: ['Media not found'],
          });
        }
      })
      .catch((err: Error) => res.status(500).json(err));
  }

  public update(req: Request, res: Response) {
    const media_id: string = req.params.id;
    const params: MediaInterface = req.body;

    const options: UpdateOptions = {
      where: {
        id: media_id,
      },
      limit: 1,
    };

    Media.update(params, options)
      .then(() => res.status(202).json({
        data: "success",
      }))
      .catch((err: Error) => res.status(500).json(err));
  }

  public delete(req: Request, res: Response) {
    const media_id: string = req.params.id;
    const options: DestroyOptions = {
      where: {
        id: media_id,
      },
      limit: 1,
    };

    Media.destroy(options)
      .then(() => res.status(204).json({
        data: "success",
      }))
      .catch((err: Error) => res.status(500).json(err));
  }

  public async preprocess(req: Request, res: Response, next: any) {
    try {
      // tslint:disable-next-line:no-console
      console.log(req.file);
      await storeTwoSizePic(req.file.destination, req.file.filename);
      let folderName: string;
      const semester: string = req.body.semester;
      if(semester) {
        if(semester.length > 6) throw new Error("Wrong semester format");
        if(semester[4] !== '0' || (semester[5] !== '2' && semester[5] !== '9')) throw new Error("Wrong month");
        const year: number = parseInt(semester.slice(0,4), 10);
        const month: number = parseInt(semester.slice(4,6), 10);
        const semesterDate: Date = new Date(year, month);
        folderName = generateIndexFolder(semesterDate);
      }
      else {
        folderName = generateIndexFolder(new Date());
        req.body.semester = folderName;
      }
      await moveTmpFilesToRightFolder(folderName);
      next();
    } catch(err) {
      // tslint:disable-next-line:no-console
      console.log(err);
      return res.status(500).json({
        message: "preprocess error",
      });
    }
  }
}