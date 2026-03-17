import chai from "chai";
import supertest from "supertest";
import app from "../src/app.js";

const expect = chai.expect;
const requester = supertest(app);

describe("Users API", () => {
  let uid;
  const uniqueEmail = `crudtester_${Date.now()}@example.com`;

  before(async () => {
    const user = await requester.post("/api/sessions/register").send({
      first_name: "Crud",
      last_name: "Tester",
      email: uniqueEmail,
      password: "1234"
    });
    uid = user.body.payload; // register devuelve solo el ID
  });

  it("Debe obtener todos los usuarios", async () => {
    const res = await requester.get("/api/users");
    expect(res.status).to.equal(200);
    expect(res.body.payload).to.be.an("array");
  });

  it("Debe obtener un usuario por ID", async () => {
    const res = await requester.get(`/api/users/${uid}`);
    expect(res.status).to.equal(200);
    expect(res.body.payload).to.have.property("_id", uid);
  });

  it("Debe actualizar un usuario", async () => {
    const res = await requester.put(`/api/users/${uid}`).send({
      first_name: "CrudUpdated"
    });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message", "User updated");
  });

  it("Debe eliminar un usuario", async () => {
    const res = await requester.delete(`/api/users/${uid}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message", "User deleted");
  });
});