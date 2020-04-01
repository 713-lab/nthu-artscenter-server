import multer from 'multer';
import path from 'path';
import {
  mkdir,
  stat,
} from 'fs';

import { UPLOAD_TMP_DIR } from "../config/constant";

const storage = multer.diskStorage({
  destination(_req, _file, cb) {
    stat(UPLOAD_TMP_DIR, (error) => {
      if (error) {
        mkdir(UPLOAD_TMP_DIR, {
          recursive: true,
        }, (err) => {
          if (err) {
            cb(new Error("mkdir failed"), UPLOAD_TMP_DIR);
          }
          cb(null, UPLOAD_TMP_DIR);
        });
      }
      cb(null, UPLOAD_TMP_DIR);
    });

  },
  filename(_req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

export const upload = multer({
  storage,
  fileFilter(_req, file, callback) {
    const ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg' && ext !== '.JPG' && ext !== '.PNG') {
      return callback(new Error('Only images are allowed'));
    }
    callback(null, true);
  },
  limits: {
    fileSize: 1920 * 1920,
  },

});