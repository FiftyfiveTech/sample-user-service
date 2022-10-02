import { inputObjectType, enumType } from "@nexus/schema";

const userAddressInputType = inputObjectType({
  name: "userAddressInputType",
  definition(table) {
    table.nullable.string("countryCode");
    table.nullable.string("city");
    table.nullable.string("postalCode");
  },
});

export { userAddressInputType };
