import { ApolloError } from "apollo-server-express";

enum ErrorCode {
  DATABASE_ERROR = "DATABASE_ERROR",
  EMAIL_ALREADY_IN_USE = "EMAIL_ALREADY_IN_USE",
  INCORRECT_ARGUMENTS = "INCORRECT_ARGUMENTS",
  INTERNAL_ERROR = "INTERNAL_ERROR",
  INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
  INVALID_TOKEN = "INVALID_TOKEN",
  NOT_AUTHENTICATED = "NOT_AUTHENTICATED",
  NOT_AUTHORIZED = "NOT_AUTHORIZED",
  RESOURCE_ALREADY_EXISTS = "RESOURCE_ALREADY_EXISTS",
  RESOURCE_ID_NOT_FOUND = "RESOURCE_ID_NOT_FOUND",
  ROLE_NOT_GRANTED = "ROLE_NOT_GRANTED",
  USER_NOT_FOUND = "USER_NOT_FOUND",
  VALIDATION_FAILED = "VALIDATION_FAILED",

  UNKNOWN = "UNKNOWN",
}

const createError = (code: ErrorCode, ...args: any[]) => {
  switch (code) {
    case ErrorCode.DATABASE_ERROR:
      return new ApolloError(`A database error occurred. ${args[0]}`, code);
    case ErrorCode.EMAIL_ALREADY_IN_USE:
      return new ApolloError(`email '${args[0]}' already in use`, code);
    case ErrorCode.INCORRECT_ARGUMENTS:
      return new ApolloError(
        `Incorrect arguments passed in request. ${args[0]}`,
        code
      );
    case ErrorCode.INTERNAL_ERROR:
      return new ApolloError("Internal error", code);
    case ErrorCode.INVALID_CREDENTIALS:
      return new ApolloError("Invalid credentials", code);
    case ErrorCode.INVALID_TOKEN:
      return new ApolloError(`Invalid token`, code);
    case ErrorCode.NOT_AUTHENTICATED:
      return new ApolloError("Not authenticated", code);
    case ErrorCode.NOT_AUTHORIZED:
      return new ApolloError("Not authorized", code);
    case ErrorCode.RESOURCE_ALREADY_EXISTS:
      return new ApolloError("Resource already exists", code, {
        alreadyExistsErrors: args[0],
      });
    case ErrorCode.RESOURCE_ID_NOT_FOUND:
      return new ApolloError(`Resource id '${args[0]}' not found`, code);
    case ErrorCode.ROLE_NOT_GRANTED:
      return new ApolloError(`Role ${args[0]} not granted`, code);
    case ErrorCode.USER_NOT_FOUND:
      return new ApolloError(`User '${args[0]}' not found`, code);
    case ErrorCode.VALIDATION_FAILED:
      return new ApolloError("Validation failed", code, {
        validationErrors: args[0],
      });

    default:
      return new ApolloError(`Unknown error: ${args[0]}`, ErrorCode.UNKNOWN);
  }
};

export { ErrorCode, createError };
