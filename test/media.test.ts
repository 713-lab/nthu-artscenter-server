import request from "supertest";
import app from "../src/app";

describe("GET /api", () => {
  test("should return 200 OK", async () => {
    return await request(app).get("/api/v2/medias")
          .expect(200);
  })
})