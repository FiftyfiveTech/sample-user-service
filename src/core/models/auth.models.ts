import { interfaceType, objectType } from "@nexus/schema";

const iUser = interfaceType({
  name: "iUser",
  definition(table) {
    table.nonNull.id("id");
    table.nonNull.string("firstName");
    table.nonNull.string("lastName");
    table.nonNull.string("email");
    table.nonNull.field("role", { type: "role" });
  },
});

const signInUserResponse = objectType({
  name: "signInUserResponse",
  definition(table) {
    table.nonNull.id("id");
    table.nonNull.string("firstName");
    table.nonNull.string("lastName");
    table.nonNull.string("email");
    table.nullable.string("gender");
    table.nullable.string("createdAt");
    table.nullable.string("updatedAt");
    table.nonNull.field("role", { type: "role" });
  },
});

const signInResponse = objectType({
  name: "signInResponse",
  definition(table) {
    table.string("token");
    table.field("user", { type: signInUserResponse });
  },
});

const userCreationResponse = objectType({
  name: "userCreationResponse",
  definition(table) {
    table.implements(iUser);
  },
});

const userDeletionResponse = objectType({
  name: "userDeletionResponse",
  definition(table) {
    table.nonNull.boolean("success");
    table.nullable.string("message");
  },
});

const userTokenResponse = objectType({
  name: "userTokenResponse",
  definition(table) {
    table.implements(iUser);
  },
});

export {
  signInResponse,
  userCreationResponse,
  userDeletionResponse,
  userTokenResponse,
};
