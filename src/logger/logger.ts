import pino from "pino";
import expressPinoLogger from "express-pino-logger";
import config from "../../config";

export const logger = pino({
  level: config.development.logger.logLevel,
});

export const expressLogger = expressPinoLogger({
  logger: logger.child({ source: "express" }),
  useLevel: "debug",
});
