import request from "supertest";
import app from "../src/app";
import { loadModels } from "../src/models";
import { db } from "../src/config/database";
import { User } from "../src/models/User";
import { Information } from "../src/models/Information";
import { Media } from "../src/models/Media";

const server = request(app);

// tslint:disable-next-line:no-console
//console.log(`${process.env.DB_NAME}\n${process.env.DB_USERNAME}\n${process.env.DB_PASSWORD}\n${process.env.SERVER_PORT}`)

const testInformation1 = {
  title: "test information 1",
  description: "test information 1 description",
  start_date: "2019-01-02",
  isActive: "true"
}

const testMedia1 = {
  file: "1.jpg",
  note: "test 1.jpg",
  semester: "201902",
}

const testMedia2 = {
  file: "2.jpg",
  note: "test 2.jpg",
  semester: "201902",
}

beforeAll(async () => {
  await loadModels();
  await User.create({
    email: "test1@gmail.com",
    password: "admintest1",
    name: "test1",
  });
  const information = await Information.create(testInformation1);
  testMedia1['informationId'] = information.id;
  testMedia2['informationId'] = information.id;
  await Media.create(testMedia1);
  await Media.create(testMedia2);

});

describe("GET /api/v2/informations", () => {
  test("should return 200 OK", async () => {
      await server.get("/api/v2/informations")
          .expect(200);
    

  })
})

describe("GET /api/v2/informations/1", () => {
  test("should return 200 OK", async () => {
    const res = await server.get("/api/v2/informations/1")
          .expect(200)
    expect(res.body.id).toBe(1);
    expect(res.body.title).toBe(testInformation1.title);
    expect(res.body.description).toBe(testInformation1.description);
    expect(res.body.start_date).toBe(testInformation1.start_date);
  })
})
