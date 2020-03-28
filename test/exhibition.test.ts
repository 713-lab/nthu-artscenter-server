import request from "supertest";
import app from "../src/app";
import { loadModels } from "../src/models";
import { db } from "../src/config/database";
import { User } from "../src/models/User";
import { Exhibition } from "../src/models/Exhibition";
import { Media } from "../src/models/Media";

const server = request(app);

let testExhibitionId: number;
let testExhibitionId2: number;
let testExhibitionId3: number;
let testExhibitionId4: number;
const testExhibition1: any = {
    title: "test exhibition 1",
    description: "test exhibition 1 description",
    type: "visual_arts",
    start_date: "2019-02-27"
}

const testExhibition2: any = {
    title: "test exhibition 2",
    description: "test exhibition 2 description",
    type: "film",
    start_date: "2019-02-27"
}

const testExhibition3: any = {
    title: "test exhibition 3",
    description: "test exhibition 3 description",
    type: "visual_arts",
    start_date: "2018-02-27"
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

const testMedia3 = {
    file: "3.jpg",
    note: "test 3.jpg",
    semester: "201902",
}
    
const testMedia4 = {
    file: "4.jpg",
    note: "test 4.jpg",
    semester: "201802",
}

beforeAll(async (done) => {
    try {
        await loadModels();
        await User.create({
            email: "test1@gmail.com",
            password: "admintest1",
            name: "test1", 
        });
        //exhibition 1
        const exhibition1 = await Exhibition.create(testExhibition1);
        testMedia1['exhibitionId'] = exhibition1.id;
        testMedia2['exhibitionId'] = exhibition1.id;
        testExhibitionId = exhibition1.id;
        await Media.create(testMedia1);
        await Media.create(testMedia2);
        //exhibition 2
        const exhibition2 = await Exhibition.create(testExhibition2);
        testMedia3['exhibitionId'] = exhibition2.id;
        testExhibitionId2 = exhibition2.id;
        await Media.create(testMedia3);
        //exhibition 3
        const exhibition3 = await Exhibition.create(testExhibition3);
        testMedia4['exhibitionId'] = exhibition3.id;
        testExhibitionId3 = exhibition3.id;
        await Media.create(testMedia4);
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

describe("GET /api/v2/exhibitions?typeOfArt=visual_arts", () => {
    test("should return 200 OK", async () => {
        const res = await server.get("/api/v2/exhibitions?typeOfArt=visual_arts")
            .expect(200);
        expect(res.body[0].id).toBe(testExhibitionId);
        expect(res.body[0].title).toBe(testExhibition1.title);
        expect(res.body[0].description).toBe(testExhibition1.description);
        expect(res.body[0].start_date).toBe(testExhibition1.start_date);
        expect(res.body[0].type).toBe(testExhibition1.type);
        expect(res.body[1].id).toBe(testExhibitionId3);
        expect(res.body[1].title).toBe(testExhibition3.title);
        expect(res.body[1].description).toBe(testExhibition3.description);
        expect(res.body[1].start_date).toBe(testExhibition3.start_date);
        expect(res.body[1].type).toBe(testExhibition3.type);
    })
})

describe("GET /api/v2/exhibitions?year=2019", () => {
    test("should return 200 OK", async () => {
        const res = await server.get("/api/v2/exhibitions?year=2019")
            .expect(200);
        expect(res.body[0].id).toBe(testExhibitionId);
        expect(res.body[0].title).toBe(testExhibition1.title);
        expect(res.body[0].description).toBe(testExhibition1.description);
        expect(res.body[0].start_date).toBe(testExhibition1.start_date);
        expect(res.body[0].type).toBe(testExhibition1.type);
        expect(res.body[1].id).toBe(testExhibitionId2);
        expect(res.body[1].title).toBe(testExhibition2.title);
        expect(res.body[1].description).toBe(testExhibition2.description);
        expect(res.body[1].start_date).toBe(testExhibition2.start_date);
        expect(res.body[1].type).toBe(testExhibition2.type);
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