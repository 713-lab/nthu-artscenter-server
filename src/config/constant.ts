import dotenv from "dotenv";
import path from 'path';

dotenv.config({
    path: "../.env.example",
});

// tslint:disable-next-line:no-console
// console.log(process.env);

export const STATIC_UPLOADS_API = process.env.SERVER_URL + '/static/uploads';
export const UPLOAD_DIR = path.join(__dirname, '../../public/static/uploads');
export const UPLOAD_TMP_DIR = path.join(__dirname, '../../public/static/uploads/tmp');