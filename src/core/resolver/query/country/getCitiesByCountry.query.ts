import { extendType } from "@nexus/schema";
import { error } from "../../../utils";
import { CountryHelper } from "../../../utils";

const GetCitiesByCountryQuery = extendType({
  type: "Query",

  definition: (table) => {
    // Get cities by country
    table.list.field("getCitiesByCountry", {
      type: "String",
      args: {
        countryCode2Alpha: "String",
      },
      resolve: async (root, args, ctx) => {
        const countryCode: string = args.countryCode2Alpha ?? "";

        if (!countryCode) {
          throw error.createError(
            error.ErrorCode.INCORRECT_ARGUMENTS,
            "Correct country code is required"
          );
        }

        try {
          const countryHelper = new CountryHelper();
          return await countryHelper.getCitiesByCountry(countryCode);
        } catch (err) {
          throw err;
        }
      },
    });
  },
});

export { GetCitiesByCountryQuery };
