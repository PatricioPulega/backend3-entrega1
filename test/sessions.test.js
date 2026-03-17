import chai from "chai";
import supertest from "supertest";
import app from "../src/app.js";

const expect = chai.expect;
const requester = supertest(app);

describe("Sessions API", () => {
  const uniqueEmail = `testuser_${Date.now()}@example.com`;

  it("Debe registrar un usuario", async () => {
    const res = await requester.post("/api/sessions/register").send({
      first_name: "Test",
      last_name: "User",
      email: uniqueEmail,
      password: "1234"
    });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("payload"); // es solo el ID
  });

  it("Debe hacer login y devolver cookie", async () => {
    const res = await requester.post("/api/sessions/login").send({
      email: uniqueEmail,
      password: "1234"
    });
    expect(res.status).to.equal(200);
    expect(res.headers["set-cookie"]).to.exist;
  });

  it("Debe devolver el usuario actual con /current", async () => {
    const login = await requester.post("/api/sessions/login").send({
      email: uniqueEmail,
      password: "1234"
    });
    const cookie = login.headers["set-cookie"][0];

    const res = await requester.get("/api/sessions/current")
      .set("Cookie", cookie);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("payload");
  });
});