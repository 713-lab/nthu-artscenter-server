import dotenv from "dotenv";

dotenv.config({
    path: "../.env"
});

// tslint:disable-next-line:no-console
console.log(process.env);

export const UPLOAD_DIR = process.env.SERVER_URL + '/static/uploads'