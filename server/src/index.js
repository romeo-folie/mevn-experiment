const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = require("./routes");
const winston = require("winston");
const path = require("path");

const {transports, format, createLogger} = winston;
const config = dotenv.config({path: path.join(process.cwd(), "/.env")});

if (config.error) {
  logger.error("dotenv config error ", config.error);
  throw config.error;
}

const logger = createLogger({
  format: format.json(),
  defaultMeta: {service: "client-service"},
  transports: [
    new transports.File({
      level: "error",
      filename: "errors.log",
    }),
    new transports.File({
      level: "info",
      filename: "combined.log",
    }),
  ],
  exceptionHandlers: [new transports.File({filename: "exceptions.log"})],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    })
  );
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

  await connectToDB();

  app.listen(port, () => logger.info(`server up on port ${port}`));
}

startServer();