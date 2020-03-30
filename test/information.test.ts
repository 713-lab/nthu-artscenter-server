import request from "supertest";
import app from "../src/app";
import { loadModels } from "../src/models";
import { db } from "../src/config/database";
import { User } from "../src/models/User";
import { Information } from "../src/models/Information";
import { Media } from "../src/models/Media";
import { 
  testUser1,
  testInformation1,
  testMedia1,
  testMedia2
 } from "./data";
const server = request(app);

// tslint:disable-next-line:no-console
//console.log(`${process.env.DB_NAME}\n${process.env.DB_USERNAME}\n${process.env.DB_PASSWORD}\n${process.env.SERVER_PORT}`)

beforeAll((done) => {
  loadModels()
  .then(() => {
    done()
  })
})

afterAll((done) => {
  db.close()
  .then(() => {
    done()
  })
})

describe("GET /api/v2/informations", () => {
  test("should return 200 OK", async () => {
      await server.get("/api/v2/informations")
          .expect(200);
    

  })
})

describe("GET /api/v2/informations/:id", () => {
  test("should return 200 OK", async () => {
    const res = await server.get(`/api/v2/informations/${testInformation1.id}`)
          .expect(200)
    expect(res.body.id).toBe(testInformation1.id);
    expect(res.body.title).toBe(testInformation1.title);
    expect(res.body.description).toBe(testInformation1.description);
    expect(res.body.start_date).toBe(testInformation1.start_date);
  })
})

describe("PUT /api/v2/informations/:id", () => {
  test("should return 202 OK", async () => {
    const response = await server.post("/api/v2/login")
      .send(testUser1)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')

    const session = response.header['set-cookie'];
    return await server.put(`/api/v2/informations/${testInformation1.id}`)
          .set("Cookie", session)
          .send({
            title: "change test1 title"
          })
          .expect(202)
  })
})

describe("DELETE /api/v2/informations/:id", () => {
  test("should return 200 OK", async () => {
    const response = await server.post("/api/v2/login")
      .send(testUser1)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')

    const session = response.header['set-cookie'];
    return await server.delete(`/api/v2/informations/${testInformation1.id}`)
          .set("Cookie", session)
          .expect(204)

        
  })
})
