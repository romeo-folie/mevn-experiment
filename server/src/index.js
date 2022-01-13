const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = require("./routes");
const path = require("path");
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./utils/swagger");
const logger = require("./utils/logger");

const config = dotenv.config({path: path.join(process.cwd(), "/.env")});

if (config.error) {
  logger.error("dotenv config error ", config.error);
  throw config.error;
}

async function connectToDB() {
  const uri = process.env.DB_URI;

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    logger.error(`db connection error ${error}`);
    process.exit(1);
  }
}

async function startServer() {
  const app = express();
  const port = process.env.PORT;

  app.use(express.json());
  app.use(cors());
  app.use(router);
  app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

  await connectToDB();

  app.listen(port, () => logger.info(`server up on port ${port}`));
}

startServer();
