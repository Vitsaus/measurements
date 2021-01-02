import { server } from "../src/server";
import request from "supertest";
import { createConnection } from "typeorm";

jest.setTimeout(7000);

let connection;
let api;
let id;

beforeAll(async () => {
    connection = await createConnection({
        type: "postgres",
        host: "localhost",
        port: 5433,
        username: "api",
        password: "api",
        database: "api",
        synchronize: true,
        logging: false,
        entities: ["src/entity/**/*.ts"],
        migrations: ["src/migration/**/*.ts"],
        subscribers: ["src/subscriber/**/*.ts"],
    });
    api = await server(false, connection);
});

afterAll(async () => {
    await connection.close();
});

describe("POST /", function () {
    it("should create measurement and return 200 on success", function (done) {
        request(api)
            .post("/")
            .send({
                name: "test",
                unit: "test",
                lower: 100,
                upper: 150,
            })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(201)
            .end((err, res) => {
                expect(res.body.id).toBeGreaterThan(0);
                id = res.body.id;
                console.log(`got id for test suite: ${id}`);
                done();
            });
    });

    it("upper should be greater than lower and should return 400 on failure", function (done) {
        request(api)
            .post("/")
            .send({
                name: "test",
                unit: "test",
                lower: 200,
                upper: 150,
            })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(400, done);
    });

    it("lower can not be equal to upper and should return 400 on failure", function (done) {
        request(api)
            .post("/")
            .send({
                name: "test",
                unit: "test",
                lower: 200,
                upper: 200,
            })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(400, done);
    });
});

describe(`PUT /:id`, function () {
    it(`should update measurement and return 200 on success`, function (done) {
        request(api)
            .put(`/${id}`)
            .send({
                name: "test",
                unit: "test",
                lower: 100,
                upper: 152,
            })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                expect(res.body.id).toEqual(id);
                done();
            });
    });

    it("should fail on bad id value and return 400 on failure", function (done) {
        request(api)
            .put("/testlul")
            .send({
                name: "test",
                unit: "test",
                lower: 100,
                upper: 152,
            })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(400, done);
    });

    it("upper should be greater than lower and should return 400 on failure", function (done) {
        request(api)
            .put(`/${id}`)
            .send({
                name: "test",
                unit: "test",
                lower: 200,
                upper: 150,
            })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(400, done);
    });

    it("lower can not be equal to upper and should return 400 on failure", function (done) {
        request(api)
            .put(`/${id}`)
            .send({
                name: "test",
                unit: "test",
                lower: 200,
                upper: 200,
            })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(400, done);
    });
});

describe("GET /", function () {
    it("should return 200 and return json array", function (done) {
        request(api)
            .get("/")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                expect(Array.isArray(res.body)).toBe(true);
                done();
            });
    });
});

describe("GET /:id", function () {
    it("should return 200 on success and result body", function (done) {
        request(api)
            .get(`/${id}`)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                expect(res.body.id).toEqual(id);
                done();
            });
    });
    it("should return 400 on failure", function (done) {
        request(api).get(`/luldude`).set("Accept", "application/json").expect("Content-Type", /json/).expect(400, done);
    });
});

describe("DELETE /:id", function () {
    it("should return 200 on success", function (done) {
        request(api)
            .delete(`/${id}`)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                expect(res.body.affected).toEqual(1);
                done();
            });
    });

    it("should return 400 on failure", function (done) {
        request(api)
            .delete(`/${id}`)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(400, done);
    });
});
