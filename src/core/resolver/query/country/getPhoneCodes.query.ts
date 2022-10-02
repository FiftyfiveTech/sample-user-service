import { extendType } from "@nexus/schema";
import { CountryHelper } from "../../../utils";

const GetPhoneCodesQuery = extendType({
  type: "Query",

  definition: (table) => {
    // Get all phone codes
    table.list.field("getPhoneCodes", {
      type: "countryPhoneCode",
      args: {},
      resolve: async (root, args, ctx) => {
        try {
          const countryHelper = new CountryHelper();
          return await countryHelper.getCountryDialCodes();
        } catch (err) {
          throw err;
        }
      },
    });
  },
});

export { GetPhoneCodesQuery };
