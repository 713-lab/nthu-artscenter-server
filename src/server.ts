import app from "./app";
import { Exhibition } from "./models/Exhibition";
import { Media } from "./models/Media";
import { Publication } from "./models/Publication";
import { User } from "./models/User";
import { Information } from "./models/Information";
import { loadModels } from "./models";

const server = app.listen(app.get("port"));
// tslint:disable-next-line:no-console
console.log(`Server starts on port ${app.get("port")}`);

loadModels()
  .then(() => {
    // tslint:disable-next-line:no-console
    console.log("Database load success");
  })
  .catch((err) => {
    // tslint:disable-next-line:no-console
    console.log(err);
    server.close();
    process.exit(1);
  });

