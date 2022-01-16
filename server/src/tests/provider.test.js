const request = require("supertest");
const server = require("../server");
const db = require("./db");
const {providerModel} = require("../models/provider.model");

const agent = request.agent(server);

beforeAll(async () => await db.connect());
beforeEach(async () => await db.clear());
afterAll(async () => await db.close());

const provider = {name: "Test Provider"};
const updatedProvider = {name: "Updated Test Provider"};
const emptyProvider = {name: ""};

describe("provider tests", () => {
  describe("GET /providers", () => {
    it("should get an array of providers", async () => {
      await providerModel.addProvider(provider);
      const res = await agent.get("/providers");

      expect(res.statusCode).toEqual(200);
      expect(res.body.data).toBeDefined();
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data).toHaveLength(1);
    });
  });

  describe("POST /providers", () => {
    it("should add a new provider", async () => {
      const res = await agent.post("/providers").send(provider);

      expect(res.statusCode).toEqual(201);
      expect(res.body.data).toBeDefined();
      expect(typeof res.body.data === "object").toBe(true);
      expect.objectContaining(provider);
      expect(res.body.data.name).toEqual(provider.name);
    });

    it("should fail to add a new provider if required parameters are not provided", async () => {
      const res = await agent.post("/providers").send(emptyProvider);

      expect(res.statusCode).toEqual(500);
      expect(res.body.success).toEqual(false);
      expect(res.body.data).toBeUndefined();
      expect(res.body.message).toBeDefined();
    });
  });

  describe("GET /providers/:id", () => {
    it("should return a 500 for improperly formed provider id", async () => {
      const id = "61dffb68217c76966a";

      const res = await agent.get(`/providers/${id}`);

      expect(res.statusCode).toEqual(500);
      expect(res.body.data).toBeUndefined();
      expect(res.body.message).toBeDefined();
    });

    it("should return 404 for a non existent provider", async () => {
      const id = "61e003d477f53053d785e04b";

      const res = await agent.get(`/providers/${id}`);

      expect(res.statusCode).toEqual(404);
      expect(res.body.data).toBeUndefined();
    });

    it("should return a provider document if it exists", async () => {
      let newProvider = await providerModel.addProvider(provider);

      const res = await agent.get(`/providers/${newProvider.id}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.data).toBeDefined();
      expect(typeof res.body.data === "object").toBe(true);
      expect(res.body.data.name).toEqual(newProvider.name);
    });
  });

  describe("PUT /providers/:id", () => {
    it("should fail to update non existent provider", async () => {
      const id = "61e003d477f53053d785e04a";

      const res = await agent.put(`/providers/${id}`).send(updatedProvider);

      expect(res.statusCode).toEqual(404);
      expect(res.body.success).toEqual(false);
      expect(res.body.message).toBeDefined();
    });

    it("should update and return updated provider", async () => {
      const createdProvider = await providerModel.addProvider(provider);

      const res = await agent
        .put(`/providers/${createdProvider._id}`)
        .send(updatedProvider);

      expect(res.statusCode).toEqual(200);
      expect(res.body.data).toBeDefined();
      expect.objectContaining(updatedProvider);
      expect(res.body.data.name).toEqual(updatedProvider.name);
    });
  });

  describe("DELETE /providers/:id", () => {
    it("should fail to delete non existent provider", async () => {
      const id = "61e003d477f53053d785e04a";

      const res = await agent.delete(`/providers/${id}`);

      expect(res.statusCode).toEqual(404);
      expect(res.body.success).toEqual(false);
      expect(res.body.message).toBeDefined();
    });

    it("should delete and return deleted provider", async () => {
      let newProvider = await providerModel.addProvider(provider);
      newProvider = await providerModel.findProvider(newProvider._id);
      
      const res = await agent.delete(`/providers/${newProvider._id}`);
      const foundProvider = await providerModel.findProvider(res.body.data._id);

      expect(newProvider.name).toEqual(provider.name);
      expect(res.statusCode).toBe(200);
      expect(res.body.data.name).toBe(newProvider.name);
      expect(foundProvider).toBeNull();
    });
  });
});
