import express from 'express';
import { ExhibitionsController } from "../controllers/exhibitions.controller";
import { PublicationsController } from "../controllers/publications.controller";
import { MediasController } from "../controllers/medias.controller";
import { upload } from "../utils/multer";
import { UsersController } from '../controllers/users.controller';

const app = express();

const exhibitionsController = new ExhibitionsController();
const publicationsController = new PublicationsController();
const mediasController = new MediasController();
const usersController = new UsersController();

// User
app
  .route("/login")
  .get(usersController.getLogin)
  .post(usersController.login)

app
  .route("/logout")
  .get(usersController.logout)

app
  .route("/register")
  .post(usersController.register)
app
  .route("/exhibitions")
  .get(exhibitionsController.index)
  .post(usersController.isAuth, exhibitionsController.create);

app
  .route("/exhibitions/:id")
  .get(exhibitionsController.show)
  .put(usersController.isAuth, exhibitionsController.update)
  .delete(usersController.isAuth, exhibitionsController.delete);

// Media
app
  .route("/medias")
  .get(mediasController.index)
  .post(usersController.isAuth, upload.single('file'), mediasController.preprocess, mediasController.create);

app
  .route("/medias/:id")
  .get(mediasController.show)
  .put(usersController.isAuth, mediasController.update)
  .delete(usersController.isAuth, mediasController.delete);

// Publication
app
  .route("/publications")
  .get(publicationsController.index)
  .post(usersController.isAuth, publicationsController.create);

app
  .route("/publications/:id")
  .get(publicationsController.show)
  .put(publicationsController.update)
  .delete(publicationsController.delete);


export default app;