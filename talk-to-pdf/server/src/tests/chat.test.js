const request = require("supertest");
const app = require("../app");

describe("Chat API", () => {
    it("should reject empty question", async () => {
        const res = await request(app)
        .post("/api/chat")
        .send({});
        expect(res.statusCode).toBe(400);
    });
});