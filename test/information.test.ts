import request from "supertest";
import app from "../src/app";
import { db } from "../src/config/database";
import { Information } from '../src/models/Information';
import { User } from "../src/models/User";

const server = request(app);

// tslint:disable-next-line:no-console
//console.log(`${process.env.DB_NAME}\n${process.env.DB_USERNAME}\n${process.env.DB_PASSWORD}\n${process.env.SERVER_PORT}`)

const testInformation1 = {
  title: "test information 1",
  description: "test information 1 description",
  start_date: "2019-01-02",
  isActive: "true"
}
beforeAll(async () => {
  await db.sync();
  await Information.create(testInformation1);
  await User.create({
    email: "test1@gmail.com",
    password: "admintest1",
    name: "test1",
  })
})

describe("GET /api/v2/Informations", () => {
  test("should return 200 OK", (done) => {
    server.get("/api/v2/informations")
          .expect(200)
          .end((err, res) => {
            if(err) {
              done(err);
            }
            expect(res.body[0].id).toBe(1);
            expect(res.body[0].title).toBe(testInformation1.title);
            expect(res.body[0].description).toBe(testInformation1.description);
            expect(res.body[0].start_date).toBe(testInformation1.start_date);

            done();
          });
  })
})

describe("GET /api/v2/informations/1", () => {
  test("should return 200 OK", (done) => {
    server.get("/api/v2/informations/1")
          .expect(200)
          .end((err, res) => {
            if(err) {
              done(err);
            }
            expect(res.body.id).toBe(1);
            expect(res.body.title).toBe(testInformation1.title);
            expect(res.body.description).toBe(testInformation1.description);
            expect(res.body.start_date).toBe(testInformation1.start_date);

            done();
          });
  })
})