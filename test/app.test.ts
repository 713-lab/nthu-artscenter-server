import request from "supertest";
import app from "../src/app";
import { db } from "../src/config/database"
import { doesNotMatch } from "assert";

describe("Test Sequelize", () => {
  test("should OK", (done) => {
    db.authenticate()
    .then( () => {
      // tslint:disable-next-line:no-console
      done();
    })
    .catch( (err) => {
      // tslint:disable-next-line:no-console
      console.log(err)
    })
  })
})