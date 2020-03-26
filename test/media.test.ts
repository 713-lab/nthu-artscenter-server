import request from "supertest";
import app from "../src/app";
import { db } from "../src/config/database";
import { Media } from '../src/models/Media';
import { User } from '../src/models/User';

const server = request(app);

// tslint:disable-next-line:no-console
//console.log(`${process.env.DB_NAME}\n${process.env.DB_USERNAME}\n${process.env.DB_PASSWORD}\n${process.env.SERVER_PORT}`)

beforeAll(async () => {
  await db.sync();
  await Media.create({
    file: "1.jpg",
    note: "test 1.jpg",
    semester: "201902",
  })
  await User.create({
    email: "test1@gmail.com",
    password: "admintest1",
    name: "test1",
  })
})

describe("GET /api/v2/medias", () => {
  test("should return 200 OK", (done) => {
    server.get("/api/v2/medias")
          .expect(200)
          .end((_err, _res) => {
            done()
          })
  })
})

describe("GET /api/v2/medias/1", () => {
  test("should return 200 OK", (done) => {
    server.get("/api/v2/medias/1")
          .expect(200)
          .end((err, res) => {
            if(err) {
              done(err);
            }
            expect(res.body.id).toBe(1);
            expect(res.body.file).toBe("1.jpg");
            expect(res.body.note).toBe("test 1.jpg");
            expect(res.body.semester).toBe("201902");

            done();
          });
  })
})
