import request from "supertest";
import app from "../src/app";
import { db } from "../src/config/database"
import { doesNotMatch } from "assert";

beforeAll(async (done) => {
  await db.sync({alter: true});
  done();
});

afterAll(async () => {
  await db.close();
})

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