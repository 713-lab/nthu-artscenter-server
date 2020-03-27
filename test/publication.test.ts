import request from "supertest";
import app from "../src/app";
import { Publication } from "../src/models/Publication"; 
import { db } from "../src/config/database";
import { loadModels } from "../src/models";

const server = request(app);

// tslint:disable-next-line:no-console
//console.log(`${process.env.DB_NAME}\n${process.env.DB_USERNAME}\n${process.env.DB_PASSWORD}\n${process.env.SERVER_PORT}`)

let testPublicationId: number;

beforeAll(async (done) => {
  await loadModels();
  const publication = await Publication.create({
      name: "test1",
      author: "yc&ch",
    });
    testPublicationId = publication.id;
  done();
})

describe("GET /api/v2/publications", () => {
  test("should return 200 OK", async () => {
    await server.get("/api/v2/publications")
          .expect(200)
  })
})

describe("GET /api/v2/publications/:id", () => {
  test("should return 200 OK", async () => {
    const res = await server.get(`/api/v2/publications/${testPublicationId}`)
          .expect(200)
    expect(res.body.id).toBe(testPublicationId);
    expect(res.body.name).toBe("test1");
    expect(res.body.author).toBe("yc&ch");
  })
})