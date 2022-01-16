const request = require("supertest");
const server = require("../server");
const db = require("./db");
const {clientModel} = require("../models/client.model");

const agent = request.agent(server);

beforeAll(async () => await db.connect());
beforeEach(async () => await db.clear());
afterAll(async () => await db.close());

const client = {
  name: "Test Client",
  email: "testclient@mail.com",
  phone: "0243213454",
};

const updatedClient = {
  name: "Updated Test Client",
  email: "updatedtestclient@mail.com",
  phone: "0542346532",
};

const emptyClient = {
  name: "",
  email: "",
  phone: "",
};

describe("client entity tests", () => {
  describe("GET /clients", () => {
    it("should get an array of clients", async () => {
      await clientModel.addClient(client);
      const res = await agent.get("/clients");

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toEqual(true);
      expect(res.body.data).toBeDefined();
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data).toHaveLength(1);
    });
  });

  describe("POST /clients", () => {
    it("should add a new client", async () => {
      const res = await agent.post("/clients").send(client);

      expect(res.statusCode).toEqual(201);
      expect(res.body.data).toBeDefined();
      expect(typeof res.body.data === "object").toBe(true);
      expect.objectContaining(client);
      expect(res.body.data.name).toEqual(client.name);
    });

    it("should fail to add a client if required parameters are not provided", async () => {
      const res = await agent.post("/clients").send(emptyClient);

      expect(res.statusCode).toEqual(500);
      expect(res.body.success).toEqual(false);
      expect(res.body.data).toBeUndefined();
      expect(res.body.message).toBeDefined();
    });
  });

  describe("GET /clients/:id", () => {
    it("should return a 500 for improperly formed client id", async () => {
      const id = "61dffb68217c76966a";

      const res = await agent.get(`/clients/${id}`);

      expect(res.statusCode).toEqual(500);
      expect(res.body.data).toBeUndefined();
      expect(res.body.message).toBeDefined();
    });

    it("should return a 404 for a non existent client", async () => {
      const id = "61e003d477f53053d785e04b";

      const res = await agent.get(`/clients/${id}`);

      expect(res.statusCode).toEqual(404);
      expect(res.body.data).toBeUndefined();
    });

    it("should return a client document if it exists", async () => {
      let newClient = await clientModel.addClient(client);

      const res = await agent.get(`/clients/${newClient.id}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("data");
      expect(typeof res.body.data === "object").toBe(true);
      expect(res.body.data.name).toEqual(newClient.name);
    });
  });

  describe("PUT /clients/:id", () => {
    it("should fail to update non existent client", async () => {
      const id = "61e003d477f53053d785e04a";

      const res = await agent.put(`/clients/${id}`).send(updatedClient);

      expect(res.statusCode).toEqual(404);
      expect(res.body.success).toEqual(false);
      expect(res.body.message).toBeDefined();
    });

    it("should update and return updated client", async () => {
      //TODO: add providers to this test case and explore any other test cases that come up
      const createdClient = await clientModel.addClient(client);

      const res = await agent
        .put(`/clients/${createdClient._id}`)
        .send(updatedClient);

      expect(res.statusCode).toEqual(200);
      expect(res.body.data).toBeDefined();
      expect.objectContaining(updatedClient);
      expect(res.body.data.name).toEqual(updatedClient.name);
    });
  });

  describe("DELETE /clients/:id", () => {
    it("should fail to delete non existent client", async () => {
      const id = "61e003d477f53053d785e04a";

      const res = await agent.delete(`/clients/${id}`);

      expect(res.statusCode).toEqual(404);
      expect(res.body.success).toEqual(false);
      expect(res.body.message).toBeDefined();
    });

    it("should delete and return deleted client", async () => {
      let newClient = await clientModel.addClient(client);
      newClient = await clientModel.findClient(newClient._id);

      const res = await agent.delete(`/clients/${newClient._id}`);
      const foundClient = await clientModel.findClient(res.body.data._id);

      expect(newClient.name).toEqual(client.name);
      expect(res.statusCode).toBe(200);
      expect(res.body.data.name).toEqual(newClient.name);
      expect(foundClient).toBeNull();
    });
  });
});
