import request from "supertest";
import app from "../src/app";
import { loadModels } from "../src/models";
import { db } from "../src/config/database";
import { User } from "../src/models/User";
import { Exhibition } from "../src/models/Exhibition";
import { Media } from "../src/models/Media";

const server = request(app);

let testExhibitionId: number;
const testExhibition1: any = {
    title: "test exhibition 1 (movie)",
    description: "test exhibition 1 description",
    type: "movie",
    start_date: "2019-01-02"
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

beforeAll(async (done) => {
    try {
        await loadModels();
        await User.create({
            email: "test1@gmail.com",
            password: "admintest1",
            name: "test1", 
        });
        const exhibition = await Exhibition.create(testExhibition1);
        testMedia1['exhibitionId'] = exhibition.id;
        testMedia2['exhibitionId'] = exhibition.id;
        testExhibitionId = exhibition.id;
        await Media.create(testMedia1);
        await Media.create(testMedia2);
        done();
    }catch(err){
        console.log(err);
    }
});

afterAll(async () => {
    await db.close();
})

describe("GET /api/v2/exhibitions", () => {
    test("should return 200 OK", async () => {
        await server.get("/api/v2/exhibitions")
            .expect(200);
    })
})

describe("GET /api/v2/exhibitions/:id", () => {
    test("should return 200 OK", async () => {
        const res = await server.get(`/api/v2/exhibitions/${testExhibitionId}`)
            .expect(200);
        expect(res.body.id).toBe(testExhibitionId);
        expect(res.body.title).toBe(testExhibition1.title);
        expect(res.body.description).toBe(testExhibition1.description);
        expect(res.body.start_date).toBe(testExhibition1.start_date);
        expect(res.body.type).toBe(testExhibition1.type);
    })
})

describe("PUT /api/v2/exhibitions/:id", () => {
    test("should return 202 OK", async () => {
        const response = await server.post("/api/v2/login")
            .send({
                email: "test1@gmail.com",
                password: "admintest1"
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
        
        const session = response.header['set-cookie'];
        return await server.put(`/api/v2/exhibitions/${testExhibitionId}`)
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
            .send({
                email: "test1@gmail.com",
                password: "admintest1"
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
        
        const session = response.header['set-cookie'];
        return await server.delete(`/api/v2/exhibitions/${testExhibitionId}`)
            .set("Cookie", session)
            .expect(204)
    })
})