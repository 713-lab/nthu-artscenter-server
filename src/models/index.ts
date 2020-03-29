import { db } from "../config/database";
import { Information } from './Information';
import { User } from "./User";
import { Media } from "./Media";
import { Exhibition } from "./Exhibition";
import { Publication } from "./Publication";
import { Banner } from "./Banner";

export const loadModels = async () => {
  try {
    await User.sync({alter: true});
    await Exhibition.sync({alter: true});
    await Publication.sync({alter: true});
    await Information.sync({alter: true});
    await Banner.sync({alter: true});
    // Media should create behind Exhibition and Publication
    await Media.sync({alter: true});
    // tslint:disable-next-line:no-console
  }catch(err) {
    // tslint:disable-next-line:no-console
    console.log(err);
  }
}