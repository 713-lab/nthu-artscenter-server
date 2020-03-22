import app from "./app";



app.listen(app.get("port"), async () => {
  try {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ app.get("port") }` );
  } catch(err) {
    // tslint:disable-next-line:no-console
    console.log(err);
  }

})