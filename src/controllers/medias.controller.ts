import { Request, Response } from 'express';
import { Media, MediaInterface } from '../models/Media';
import { UpdateOptions, DestroyOptions } from 'sequelize';
import { storeTwoSizePic, moveTmpFilesToRightFolder, generateIndexFolder } from '../utils/sharp';
import { MediaService } from "../services/media.service";

const mediaService = new MediaService();
export class MediasController {

  public index = async (req: Request, res: Response) => {
    try {
      const medias: Media[] = await mediaService.findAllWithSrc({
        limit: req.query.limit || 12,
        offset: req.query.offset || 0,
        order: [
          ['id', 'DESC'],
        ],
      });
      res.send(medias);
    } catch(err) {
      res.status(500).send({message: "index images error"});
    }
  }

  public create = async (req: Request, res: Response) => {
    try {
      const request = req.body;
      request.file = req.file.filename;
      const params: MediaInterface = request;

      let media = await Media.create < Media > (params);
      media = await mediaService.findByPkWithSrc(media.id);
      res.status(201).json(media);
    }catch(err) {
      // tslint:disable-next-line:no-console
      console.log(err);
      res.status(500).json({ message: "create media error"});
    }
  }

  public show = async (req: Request, res: Response) => {
    try {
      const media_id: string = req.params.id;

      const media: Media | null = await mediaService.findByPkWithSrc(media_id);
      if(media) {
        res.status(200).json(media);
      }
      else {
        res.status(404).json({ message: `mediaId=${req.params.id} not found`});
      }
    } catch(err) {
      res.status(500).json({ message: "show media error"});
    }
  }

  public update = async (req: Request, res: Response) => {
    try {
      const media_id: string = req.params.id;
      const params: MediaInterface = req.body;

      const options: UpdateOptions = {
        where: {
          id: media_id,
        },
        limit: 1,
      };

      await Media.update(params, options);
      res.status(202).json({
        message: "success",
      });
    } catch(err) {
      res.status(500).json("update media error");
    }
  }

  public delete = async (req: Request, res: Response) => {
    try {
      const media_id: string = req.params.id;
      const options: DestroyOptions = {
        where: {
          id: media_id,
        },
        limit: 1,
      };

      await Media.destroy(options);
      res.status(204).json({
        message: "success",
      });
    } catch(err) {
      res.status(500).json("delete media error");
    }
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