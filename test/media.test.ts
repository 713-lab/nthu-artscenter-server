import request from "supertest";
import app from "../src/app";

// tslint:disable-next-line:no-console
console.log(`${process.env.DB_NAME}\n${process.env.DB_USERNAME}\n${process.env.DB_PASSWORD}\n${process.env.SERVER_PORT}}`)

describe("GET /api", () => {
  it("should return 200 OK", () => {
    return request(app).get("/api/v2/medias")
          .expect(200);
  })
})