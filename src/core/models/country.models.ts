import { objectType } from "@nexus/schema";

const country = objectType({
  name: "country",
  definition(table) {
    table.nonNull.string("name");
    table.nonNull.string("countryCode2Alpha");
    table.nonNull.string("countryCode3Alpha");
    table.nonNull.string("countryCode");
  },
});

const countryPhoneCode = objectType({
  name: "countryPhoneCode",
  definition(table) {
    table.nonNull.string("name");
    table.nonNull.string("dialCode");
  },
});

export { country, countryPhoneCode };
