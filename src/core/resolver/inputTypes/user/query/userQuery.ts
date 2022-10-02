import { inputObjectType, enumType } from "@nexus/schema";
import { userAddressInputType } from "./index";

const role = enumType({
  name: "role",
  members: {
    ADMIN: "ADMIN",
    SUPERADMIN: "SUPERADMIN",
    MANAGER: "MANAGER",
  },
});

const gender = enumType({
  name: "gender",
  members: {
    MALE: "MALE",
    FEMALE: "FEMALE",
    OTHER: "OTHER",
  },
});

const userInputType = inputObjectType({
  name: "userInputType",
  definition(table) {
    table.nonNull.string("firstName");
    table.nonNull.string("lastName");
    table.nonNull.string("password");
    table.nonNull.string("email");
    table.nullable.string("profileImage");
    table.nonNull.field("role", { type: "role" });
    table.nonNull.field("gender", { type: "gender" });
    table.nullable.field("address", { type: userAddressInputType });
  },
});

export { role, gender, userInputType };
