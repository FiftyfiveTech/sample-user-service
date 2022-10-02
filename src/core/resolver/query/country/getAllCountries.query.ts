import { extendType } from "@nexus/schema";
import { CountryHelper } from "../../../utils";

const GetAllCountriesQuery = extendType({
  type: "Query",

  definition: (table) => {
    // Get all countries
    table.list.field("getAllCountries", {
      type: "country",
      args: {},
      resolve: async (root, args, ctx) => {
        try {
          const countryHelper = new CountryHelper();
          return await countryHelper.getCountries();
        } catch (err) {
          throw err;
        }
      },
    });
  },
});

export { GetAllCountriesQuery };
