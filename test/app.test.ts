import request from "supertest";
import app from "../src/app";
import { db } from "../src/config/database"
import { doesNotMatch } from "assert";

beforeAll(async (done) => {
  await db.sync({alter: true});
  done();
});

describe("Test Sequelize", () => {
  test("should OK", () => {
    db.authenticate()
    .then( () => {
      // tslint:disable-next-line:no-console
      return true;
    })
    .catch( (err) => {
      // tslint:disable-next-line:no-console
      console.log(err)
    })
  })
})