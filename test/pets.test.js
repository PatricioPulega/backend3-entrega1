import chai from "chai";
import supertest from "supertest";
import app from "../src/app.js";

const expect = chai.expect;
const requester = supertest(app);

describe("Pets API", () => {
  let pid;

  it("Debe crear una mascota", async () => {
    const res = await requester.post("/api/pets").send({
      name: "Firulais",
      specie: "dog",
      birthDate: "2020-01-01"
    });
    expect(res.status).to.equal(200);
    expect(res.body.payload).to.have.property("name", "Firulais");
    expect(res.body.payload).to.have.property("_id");
    pid = res.body.payload._id;
  });

  it("Debe listar mascotas", async () => {
    const res = await requester.get("/api/pets");
    expect(res.status).to.equal(200);
    expect(res.body.payload).to.be.an("array");
  });

  it("Debe devolver error si falta un campo", async () => {
    const res = await requester.post("/api/pets").send({
      specie: "cat"
    });
    expect(res.status).to.equal(400);
  });

  it("Debe actualizar una mascota", async () => {
    const res = await requester.put(`/api/pets/${pid}`).send({
      name: "FirulaisUpdated"
    });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message", "pet updated");
  });

  it("Debe eliminar una mascota", async () => {
    const res = await requester.delete(`/api/pets/${pid}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message", "pet deleted");
  });
});
