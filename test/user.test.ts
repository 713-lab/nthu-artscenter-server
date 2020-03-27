import request from "supertest";
import app from "../src/app";
import { User } from "../src/models/User";
import { loadModels } from "../src/models";
import { db } from "../src/config/database";

const server = request(app);

// tslint:disable-next-line:no-console
//console.log(`${process.env.DB_NAME}\n${process.env.DB_USERNAME}\n${process.env.DB_PASSWORD}\n${process.env.SERVER_PORT}`)

beforeAll(async (done) => {
  await loadModels();
  await User.create({
    email: "test1@gmail.com",
    password: "admintest1",
    name: "test1",
  })
  done();
});

afterAll(async () => {
  await db.close();
})

describe("POST /api/v2/login", () => {
  test("should return 'Require email or password'", (done) => {
    server.post("/api/v2/login")
    .send({
      name: "test1",
    })
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .expect(500)
    .end((err,res) => {
      expect(res.body.message).toBe("Require email or password");
      done();
    })
  });
})
describe("POST /api/v2/login", () => {
  test("should return 'Incorrect Password'", (done) => {
    server.post("/api/v2/login")
    .send({
      email: "test1@gmail.com",
      password: "admintest2",
      name: "test1",
    })
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .expect(500)
    .end((err,res) => {
      expect(res.body.message).toBe("Incorrect password");
      done();
    })
  });
})

describe("POST /api/v2/login", () => {
  test("should return 'User not found'", (done) => {
    server.post("/api/v2/login")
    .send({
      email: "hhhhhhhh@gmail.com",
      password: "admintest2",
      name: "test2",
    })
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .expect(500)
    .end((err,res) => {
      expect(res.body.message).toBe("User not found");
      done();
    })
  });
})

describe("POST /api/v2/login", () => {
  test("should return OK", () => {
    server.post("/api/v2/login")
    .field("email", "test1@gmail.com")
    .field("password", "admintest1")
    .field("name", "test1")
    .expect(200);
  });
})