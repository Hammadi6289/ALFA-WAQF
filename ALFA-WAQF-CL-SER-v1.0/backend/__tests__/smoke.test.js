import request from "supertest";
import app from "../app.js";

describe("Smoke Test", () => {
  it("API should be alive", async () => {
    const res = await request(app).get("/api/v1/test");
    expect(res.statusCode).toBe(200);
  });
});
