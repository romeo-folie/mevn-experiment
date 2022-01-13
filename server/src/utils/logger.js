const winston = require("winston");

const {transports, format, createLogger} = winston;

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

module.exports = logger;
