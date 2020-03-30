import request from "supertest";
import app from "../src/app";
import { loadModels } from "../src/models";
import { db } from "../src/config/database";
import { User } from "../src/models/User";
import { Exhibition } from "../src/models/Exhibition";
import { Media } from "../src/models/Media";
import {
  testUser1,
  testExhibition1,
  testExhibition2,
  testExhibition3,
  testMedia1,
  testMedia2,
  testMedia3,
  testMedia4
} from './data';

const server = request(app);

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

describe("GET /api/v2/exhibitions", () => {
    test("should return 200 OK", async () => {
        await server.get("/api/v2/exhibitions")
            .expect(200);
    })
})

describe("GET /api/v2/exhibitions/:id", () => {
    test("should return 200 OK", async () => {
        const res = await server.get(`/api/v2/exhibitions/${testExhibition1.id}`)
            .expect(200);
        expect(res.body.id).toBe(testExhibition1.id);
        expect(res.body.title).toBe(testExhibition1.title);
        expect(res.body.description).toBe(testExhibition1.description);
        expect(res.body.start_date).toBe(testExhibition1.start_date);
        expect(res.body.type).toBe(testExhibition1.type);
    })
})

describe("GET /api/v2/exhibitions?typeOfArt=visual_arts", () => {
    test("should return 200 OK", async () => {
        const res = await server.get("/api/v2/exhibitions?typeOfArt=visual_arts")
            .expect(200);
        expect(res.body[0].type).toBe("visual_arts");
        expect(res.body[1].type).toBe("visual_arts");
    })
})

describe("GET /api/v2/exhibitions?year=2019", () => {
    test("should return 200 OK", async () => {
        const res = await server.get("/api/v2/exhibitions?year=2019")
            .expect(200);
        expect(res.body[0].id).not.toBe(3);
        expect(res.body[1].id).not.toBe(3);
    })
})

describe("GET /api/v2/exhibitions?searchStr=ChiaHsin", () => {
    test("should return 200 OK", async () => {
        const res = await server.get("/api/v2/exhibitions?searchStr=ChiaHsin")
            .expect(200);
        expect(res.body[0].id).not.toBe(1);
        expect(res.body[1].id).not.toBe(1);
        
    })
})

describe("GET /api/v2/exhibitions?searchStr=test", () => {
    test("should return 200 OK", async () => {
        const res = await server.get("/api/v2/exhibitions?searchStr=test")
            .expect(200);
        expect(res.body.length).toBe(3);
    })
})

describe("PUT /api/v2/exhibitions/:id", () => {
    test("should return 202 OK", async () => {
        const response = await server.post("/api/v2/login")
            .send(testUser1)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
        
        const session = response.header['set-cookie'];
        return await server.put(`/api/v2/exhibitions/${testExhibition1.id}`)
            .set("Cookie", session)
            .send({
                title: "change test1 title"
            })
            .expect(202)
    })
})

describe("DELETE /api/v2/exhibitions/:id", () => {
    test("should return 200 OK", async () => {
        const response = await server.post("/api/v2/login")
            .send(testUser1)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
        
        const session = response.header['set-cookie'];
        return await server.delete(`/api/v2/exhibitions/${testExhibition1.id}`)
            .set("Cookie", session)
            .expect(204)
    })
})