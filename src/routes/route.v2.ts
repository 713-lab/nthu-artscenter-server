import express from 'express';
import { ExhibitionsController } from "../controllers/exhibitions.controller";
import { PublicationsController } from "../controllers/publications.controller";
import { MediasController } from "../controllers/medias.controller";
import { UsersController } from "../controllers/users.controller";
import { InformationsController } from "../controllers/informations.controller";
import { upload } from "../utils/multer";
import { BannersController } from '../controllers/banners.controller';


const app = express();

const exhibitionsController = new ExhibitionsController();
const publicationsController = new PublicationsController();
const mediasController = new MediasController();
const usersController = new UsersController();
const informationsController = new InformationsController();
const bannersController = new BannersController();

// User
app
  .route("/login")
  .get(usersController.getLogin)
  .post(upload.none(), usersController.login);

app
  .route("/logout")
  .get(usersController.isAuth, usersController.logout);

app
  .route("/register")
  .post(usersController.isAuth, upload.none(), usersController.register);
app
  .route("/exhibitions")
  .get(exhibitionsController.index)
  .post(usersController.isAuth, upload.none(), exhibitionsController.create);

app
  .route("/exhibitions/:id")
  .get(exhibitionsController.show)
  .put(usersController.isAuth, upload.none(), exhibitionsController.update)
  .delete(usersController.isAuth, exhibitionsController.delete);

// Media
app
  .route("/medias")
  .get(mediasController.index)
  .post(usersController.isAuth, upload.single('file'), mediasController.preprocess, mediasController.create);

app
  .route("/medias/:id")
  .get(mediasController.show)
  .put(usersController.isAuth, upload.none(), mediasController.update)
  .delete(usersController.isAuth, mediasController.delete);

// Publication
app
  .route("/publications")
  .get(publicationsController.index)
  .post(usersController.isAuth, upload.none(), publicationsController.create);

app
  .route("/publications/:id")
  .get(publicationsController.show)
  .put(usersController.isAuth, upload.none(), publicationsController.update)
  .delete(usersController.isAuth, publicationsController.delete);

app
  .route("/informations")
  .get(informationsController.index)
  .post(usersController.isAuth, upload.none(), informationsController.create);

app
  .route("/informations/:id")
  .get(informationsController.show)
  .put(usersController.isAuth, upload.none(), informationsController.update)
  .delete(usersController.isAuth, informationsController.delete);

// Banner
app
  .route("/banners")
  .get(bannersController.index)
  .post(usersController.isAuth, upload.none(), bannersController.create);

app
  .route("/banners/:id")
  .get(bannersController.show)
  .put(usersController.isAuth, upload.none(), bannersController.update)
  .delete(usersController.isAuth, bannersController.delete);

export default app;