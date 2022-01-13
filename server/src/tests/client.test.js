const request = require("supertest");
const server = require("../server");
const db = require("./db");

const agent = request.agent(server);

beforeAll(async () => await db.connect());
beforeEach(async () => await db.clear());
afterAll(async () => await db.close());

describe("client entity tests", () => {
  describe("GET /clients", () => {
    it("should get all clients", async () => {
      const res = await agent.get("/clients");

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toEqual(true);
      expect(res.body).toHaveProperty("data");
    });
  });

  describe("GET /clients/:id", () => {
    it("should return a 404 for a non existent client", async () => {
      const id = "61dffb68217c76966a";

      const res = await agent.get(`/clients/${id}`);

      expect(res.statusCode).toEqual(404);
      expect(res.body.data).toBeUndefined();
    });

    it("should return a document if it exists", async () => {
      const id = "61e003d477f53053d785e04a";

      const res = await agent.get(`/clients/${id}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("data");
    });
  });

  describe("POST /clients", () => {
    it("should add a new client", async () => {
      const client = {
        name: "Test Client",
        email: "testclient@mail.com",
        phone: "0243213454",
      };

      const res = await agent.post("/clients").send(client);

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("data");
      expect.objectContaining(client);
      expect(res.body.data.name).toEqual(client.name);
    });

    it("should fail to add a client if required parameters are not provided", async () => {
      const client = {
        name: "",
        email: "",
        phone: "",
      };

      const res = await agent.post("/clients").send(client);

      expect(res.statusCode).toEqual(500);
      expect(res.body.success).toEqual(false);
      expect(res.body.data).toBeUndefined();
    });
  });
});
