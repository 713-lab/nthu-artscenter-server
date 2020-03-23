import app from "./app";
import { Exhibition } from "./models/Exhibition";
import { Media } from "./models/Media";



app.listen(app.get("port"), async () => {
  try {
    await Exhibition.sync({alter: true})
    await Media.sync({alter: true});
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ app.get("port") }` );
  } catch(err) {
    // tslint:disable-next-line:no-console
    console.log(err);
  }

})