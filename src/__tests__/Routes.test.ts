import request from "supertest";
import Server from "../config/Server";

describe("Routes", () => {
  const server = new Server();

  // Iniciar o servidor express antes dos testes
  beforeAll(() => {
    server.start();
  });

  // Encerrar o servidor após os testes
  afterAll(() => {
    server.close();
  });

  it("should add a user via POST request", async () => {
    const response = await request(server.getApp()).post("/usuario").send({
      cpf: "12345678901",
      nome: "Matheus Lima",
      data_nascimento: "2000-05-15",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
  });

  it("should get a user by CPF via GET request", async () => {
    const response = await request(server.getApp()).get("/usuario/12345678901");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
  });

  it("should return 404 for non-existing user", async () => {
    const response = await request(server.getApp()).get("/usuario/notuser");

    expect(response.status).toBe(404);
  });
});
