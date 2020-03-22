import request from "supertest";

// tslint:disable-next-line:no-console
console.log(process.env.SERVER_PORT);
// tslint:disable-next-line:no-console
console.log(process.env.DB_NAME);

import app from "../src/app";

describe("GET /api", () => {
  test("should return 200 OK", async () => {
    return await request(app).get("/api/v2/medias")
          .expect(200);
  })
})