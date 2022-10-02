import { inputObjectType } from "@nexus/schema";

const updateUserQueryInputType = inputObjectType({
  name: "updateUserQueryInputType",
  definition(table) {
    table.nullable.string("firstName");
    table.nullable.string("lastName");
  },
});

export { updateUserQueryInputType };
