import { extendType } from "@nexus/schema";
import { error } from "../../../utils";
import { LooseObject } from "../../../interfaces";
import { authenticateUser } from "../../../utils/auth.helper";

export const UpdateUserMutation = extendType({
  type: "Mutation",
  definition: (table) => {
    // Update user by Id
    table.field("updateUserById", {
      type: "User",
      args: {
        data: "updateUserQueryInputType",
        id: "String",
      },
      resolve: async (root, args, ctx) => {
        authenticateUser(ctx.user);

        const id = (args?.id as string) ?? "";
        const firstName = (args?.data?.firstName as string) ?? "";
        const lastName = (args?.data?.lastName as string) ?? "";

        if (!id) {
          throw error.createError(
            error.ErrorCode.INCORRECT_ARGUMENTS,
            `"id: ${id}" is not valid input.`
          );
        }

        let updateData: LooseObject = {};
        if (firstName) {
          updateData.firstName = firstName;
        }
        if (lastName) {
          updateData.lastName = lastName;
        }

        try {
          return await ctx.db.User.update({
            where: { id: id },
            data: updateData,
          });
        } catch (err) {
          throw error.createError(
            error.ErrorCode.DATABASE_ERROR,
            "There was an error updating the Assessment"
          );
        }
      },
    });
  },
});
