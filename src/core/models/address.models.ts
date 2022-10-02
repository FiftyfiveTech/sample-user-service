import { objectType } from "@nexus/schema";

const userAddressResponse = objectType({
  name: "userAddressResponse",
  definition(table) {
    table.nullable.string("id");
    table.nullable.string("country");
    table.nullable.string("countryCode2Alpha");
    table.nullable.string("city");
    table.nullable.string("postalCode");
  },
});

export { userAddressResponse };
