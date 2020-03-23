import request from "supertest";

// tslint:disable-next-line:no-console
console.log(process.env.SERVER_PORT);
// tslint:disable-next-line:no-console
console.log(process.env.DB_PASSWORD);

import app from "../dist/app";


describe("GET /api", () => {
  it("should return 200 OK", (done) => {
    request(app).get("/api/v2/medias")
          .expect(200, done);
  })
})