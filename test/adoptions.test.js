import chai from "chai";
import supertest from "supertest";
import app from "../src/app.js";

const expect = chai.expect;
const requester = supertest(app);

describe("Adoptions API", () => {
  let uid, pid, aid;
  const uniqueEmail = `adopt_${Date.now()}@example.com`;

  before(async () => {
    // Crear usuario
    const user = await requester.post("/api/sessions/register").send({
      first_name: "Adopt",
      last_name: "Tester",
      email: uniqueEmail,
      password: "1234"
    });
    uid = user.body.payload;

    // Crear mascota
    const pet = await requester.post("/api/pets").send({
      name: "Michi",
      specie: "cat",
      birthDate: "2021-01-01"
    });
    pid = pet.body.payload._id;
  });

  it("Debe crear una adopción válida", async () => {
    const res = await requester.post(`/api/adoptions/${uid}/${pid}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message", "Pet adopted");
  });

  it("Debe obtener todas las adopciones", async () => {
    const res = await requester.get("/api/adoptions");
    expect(res.status).to.equal(200);
    expect(res.body.payload).to.be.an("array");
    if (res.body.payload.length > 0) {
      aid = res.body.payload[0]._id;
    }
  });

  it("Debe obtener una adopción por ID", async () => {
    if (!aid) return;
    const res = await requester.get(`/api/adoptions/${aid}`);
    expect(res.status).to.equal(200);
    expect(res.body.payload).to.have.property("_id", aid);
  });

  it("Debe devolver error si el usuario no existe", async () => {
    const res = await requester.post(`/api/adoptions/507f1f77bcf86cd799439011/${pid}`);
    expect(res.status).to.equal(404);
  });

  it("Debe devolver error si la mascota no existe", async () => {
    const res = await requester.post(`/api/adoptions/${uid}/507f1f77bcf86cd799439011`);
    expect(res.status).to.equal(404);
  });
});
