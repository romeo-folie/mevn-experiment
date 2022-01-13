const request = require("supertest");
const app = require("../server");
const db = require("./db");

const agent = request.agent(app);

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
    it("should return a 404 for non existent client document", async () => {
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
});
