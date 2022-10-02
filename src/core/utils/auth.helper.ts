import bcrypt from "bcryptjs";
import { error, RegExHelper, RegExStrings } from "../utils";
import jwt from "jsonwebtoken";
import { User } from "../interfaces/user";
import prismaClient from "../../server/prismaClient";

const comparePassword = async (
  passwordToCheck: string,
  encryptedPassword: string
) => {
  const valid = await bcrypt.compare(passwordToCheck, encryptedPassword);
  if (!valid) {
    throw error.createError(error.ErrorCode.INVALID_CREDENTIALS);
  }
};

const hashPassword = async (passwordToHash: string) => {
  const genSalt = await bcrypt.genSalt(12);
  return await bcrypt.hash(passwordToHash, genSalt);
};

const validateEmail = (email: string): Boolean => {
  const regExHelper = new RegExHelper();
  return regExHelper.validateRegex(RegExStrings.EMAIL_REGEX, email);
};

const getUserById = async (id: string) => {
  try {
    const validateUser = await prismaClient.user.findUnique({
      where: { id },
    });
    return validateUser;
  } catch (err) {
    throw err;
  }
};

const validateToken = (token: string) => {
  try {
    const decodedToken: any = jwt.verify(token, String(process.env.SECRET));
    const userId = decodedToken.id;
    const user = getUserById(userId);
    return user;
  } catch {
    throw error.createError(error.ErrorCode.NOT_AUTHORIZED);
  }
};

const authenticateUser = (user: User) => {
  if (!user) {
    throw error.createError(error.ErrorCode.NOT_AUTHENTICATED);
  }
  return user;
};

export {
  authenticateUser,
  comparePassword,
  getUserById,
  hashPassword,
  validateEmail,
  validateToken,
};
