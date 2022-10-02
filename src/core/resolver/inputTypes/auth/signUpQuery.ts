import { inputObjectType } from "@nexus/schema";

const signupQueryInputType = inputObjectType({
  name: "signupQueryInputType",
  definition(table) {
    table.nonNull.string("firstName");
    table.nonNull.string("lastName");
    table.nonNull.string("password");
    table.nonNull.string("email");
    table.nonNull.field("role", { type: "role" });
  },
});

export { signupQueryInputType };
