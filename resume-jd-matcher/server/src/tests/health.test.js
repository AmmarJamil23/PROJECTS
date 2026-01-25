import request from "supertest"
import app from "../src/app.js"
import { describe, it, expect } from "vitest"

describe("Helath API", () => {
    it("should return ok", async () => {
        const res = await request(app).get("/api/health")
        expect(res.status).toBe(200)
        expect(res.body.status).toBe("ok")
    })
})