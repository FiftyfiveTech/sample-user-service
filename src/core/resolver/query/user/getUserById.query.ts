import { extendType } from "@nexus/schema";
import { error } from "../../../utils";

const GetUserByIdQuery = extendType({
  type: "Query",
  definition: (table) => {
    //Get user by id
    table.field("getUserById", {
      type: "User",
      args: {
        id: "String",
      },
      resolve: async (root, args, ctx) => {
        const id = (args?.id as string) ?? "";

        if (!id) {
          throw error.createError(
            error.ErrorCode.INCORRECT_ARGUMENTS,
            `"id: ${id}" is not a valid argument.`
          );
        }

        try {
          return await ctx.db.User.findUnique({
            where: { id: id },
          });
        } catch {
          throw error.createError(
            error.ErrorCode.DATABASE_ERROR,
            "A database error ocurred."
          );
        }
      },
    });
  },
});

export { GetUserByIdQuery };
