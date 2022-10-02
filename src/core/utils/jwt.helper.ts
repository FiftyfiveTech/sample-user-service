import jwt from "jsonwebtoken";
import config from "../../../config";
import { error as errorHandler } from ".";

const createToken = (data: object) => {
  return jwt.sign({ ...data }, config.development.secret as string, {
    expiresIn: config.development.tokenExpiresIn,
  });
};

const verifyToken = (token: string) => {
  return jwt.verify(
    token,
    config.development.secret as string,
    (error, decoded) => {
      if (error) {
        throw errorHandler.createError(errorHandler.ErrorCode.INVALID_TOKEN);
      }
    }
  );
};

export { createToken, verifyToken };
