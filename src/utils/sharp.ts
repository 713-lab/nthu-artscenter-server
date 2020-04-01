import sharp from 'sharp';
import * as path from 'path';
import * as fs from 'fs';
import { UPLOAD_DIR, UPLOAD_TMP_DIR } from "../config/constant";

export const storeTwoSizePic = async (destination, filename) => {
  try {
    const coverFilename = path.join(destination, 'cover_' + filename);
    const thumbFilename = path.join(destination, 'thumb_' + filename);
    const originalFilename = path.join(destination, filename);

    const coverPipe = sharp(originalFilename)
                .resize(800,null)
                .jpeg({
                  quality:75,
                  progressive:true,
                })
                .toFile(coverFilename);
    const thumbPipe = sharp(originalFilename)
                .resize(230,null)
                .jpeg({
                  quality:75,
                  progressive:true,
                })
                .toFile(thumbFilename);
    await Promise.all([coverPipe, thumbPipe]);

  } catch(err) {
    // tslint:disable-next-line:no-console
    console.log(err);
  }
};

export const moveTmpFilesToRightFolder = async (subDir) => {
  try {
    const targetDir: string = path.join(UPLOAD_DIR, subDir);
    // tslint:disable-next-line:no-console
    console.log(targetDir);
    await fs.promises.mkdir(targetDir, { recursive: true });
    const files = await fs.promises.readdir(UPLOAD_TMP_DIR);

    const promises = files.map(async (file) => {
      const from = path.join(UPLOAD_TMP_DIR, file);
      const to = path.join(targetDir, file);
      const response = await fs.promises.rename(from, to);
      return response;
    });
    await Promise.all(promises);
  } catch(err) {
    // tslint:disable-next-line:no-console
    console.log(err);
  }
};

export const generateIndexFolder = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  let folderName;
  if (month >= 2 && month < 9) {
    folderName = year.toString() + '02';
  } else {
    folderName = year.toString() + '09';
  }
  return folderName;
};