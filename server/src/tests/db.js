const mongoose = require("mongoose");
const {MongoMemoryServer} = require("mongodb-memory-server");
const logger = require("../utils/logger");

let mongoServer;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connect = async function () {
  try {
    await mongoose.disconnect();
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri, options);
  } catch (error) {
    logger.debug("error connecting test db " + error.message);
  }
};

const close = async function () {
  try {
    await mongoose.disconnect();
    await mongoServer.stop();
  } catch (error) {
    logger.debug("error closing test db connection" + error.message);
  }
};

const clear = async function () {
  try {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
      await collections[key].deleteMany();
    }
  } catch (error) {
    logger.debug("error clearing test db" + error.message);
  }
};

module.exports = {
  connect,
  close,
  clear,
};
