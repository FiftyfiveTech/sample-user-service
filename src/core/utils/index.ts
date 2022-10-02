import { createToken, verifyToken } from "./jwt.helper";
import { ErrorCode, createError } from "../../handlers/errorHandler";
import { CountryHelper } from "./country.helper";
import { RegExHelper, RegExStrings } from "./regex.helper";
import {
  comparePassword,
  hashPassword,
  validateEmail,
  authenticateUser,
} from "./auth.helper";

const authHelper = {
  comparePassword,
  hashPassword,
  validateEmail,
  authenticateUser,
};
const JWT = { createToken, verifyToken };
const error = { ErrorCode, createError };

export { error, JWT, authHelper, CountryHelper, RegExHelper, RegExStrings };
