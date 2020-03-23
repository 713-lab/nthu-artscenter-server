import request from "supertest";
import app from "../src/app";
import { db } from "../src/config/database";
import { Publication } from '../src/models/Publication';

const server = request(app);

// tslint:disable-next-line:no-console
//console.log(`${process.env.DB_NAME}\n${process.env.DB_USERNAME}\n${process.env.DB_PASSWORD}\n${process.env.SERVER_PORT}`)

beforeAll(async () => {
  await db.sync();
  await Publication.create({
    name: "test1",
    author: "yc&ch",
  })
})

describe("GET /api/v2/publications", () => {
  it("should return 200 OK", (done) => {
    server.get("/api/v2/publications")
          .expect(200)
          .end((err, res) => {
            if(err) {
              done(err);
            }
            expect(res.body[0].id).toBe(1);
            expect(res.body[0].name).toBe("test1");
            expect(res.body[0].author).toBe("yc&ch");

            done();
          });
  })
})

describe("GET /api/v2/publications/1", () => {
  it("should return 200 OK", (done) => {
    server.get("/api/v2/publications/1")
          .expect(200)
          .end((err, res) => {
            if(err) {
              done(err);
            }
            expect(res.body.id).toBe(1);
            expect(res.body.name).toBe("test1");
            expect(res.body.author).toBe("yc&ch");

            done();
          });
  })
})