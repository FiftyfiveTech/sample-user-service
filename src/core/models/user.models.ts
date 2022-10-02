import { objectType } from "@nexus/schema";
import { userAddressResponse, avatar } from "./index";

const user = objectType({
  name: "User",
  definition(table) {
    table.nonNull.id("id");
    table.nonNull.string("firstName");
    table.nonNull.string("lastName");
    table.nonNull.string("gender");
    table.nonNull.string("email");
    table.nonNull.string("role");
    table.nonNull.string("createdAt");
    table.nonNull.string("updatedAt");
    table.nullable.field("avatar", { type: avatar });
    table.nullable.field("address", { type: userAddressResponse });
  },
});

export { user };
