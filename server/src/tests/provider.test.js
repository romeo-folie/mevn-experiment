const request = require("supertest");
const server = require("../server");
const db = require("./db");
const ongoose = require("mongoose");
const {providerModel} = require("../models/provider.model");

const agent = request.agent(server);

beforeAll(async () => await db.connect());
beforeEach(async () => await db.clear());
afterAll(async () => await db.close());

const provider = {name: "Test Provider"};

describe("provider tests", () => {
  it("should get an array of providers", async (k=))
})
