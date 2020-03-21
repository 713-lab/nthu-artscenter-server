import express from 'express';
import { ExhibitionsController } from "../controllers/exhibitions.controller";
import { MediasController } from "../controllers/medias.controller";
import { upload } from "../utils/multer";
import { } from "../utils/sharp";

const app = express();

const exhibitionsController = new ExhibitionsController();
const mediasController = new MediasController();

app
  .route("/exhibitions")
  .get(exhibitionsController.index)
  .post(exhibitionsController.create);

app
  .route("/exhibitions/:id")
  .get(exhibitionsController.show)
  .put(exhibitionsController.update)
  .delete(exhibitionsController.delete);

// Media
app
  .route("/medias")
  .get(mediasController.index)
  .post(upload.single('file'), mediasController.preprocess, mediasController.create);

app
  .route("/medias/:id")
  .get(mediasController.show)
  .put(mediasController.update)
  .delete(mediasController.delete);

export default app;