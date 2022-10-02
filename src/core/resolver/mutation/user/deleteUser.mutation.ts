import { extendType } from "@nexus/schema";
import { error } from "../../../utils";
import { ErrorCode } from "../../../../handlers/errorHandler";
import { authenticateUser } from "../../../utils/auth.helper";

export const DeleteUserMutation = extendType({
  type: "Mutation",
  definition: (table) => {
    // Delete user by Id
    table.field("deleteUserById", {
      type: "userDeletionResponse",
      args: {
        id: "String",
      },
      resolve: async (root, args, ctx) => {
        authenticateUser(ctx.user);

        const id = args.id;
        if (!id) {
          throw error.createError(
            ErrorCode.INCORRECT_ARGUMENTS,
            `The id provided is in-correct`
          );
        }

        try {
          const user = await ctx.db.User.delete({
            where: { id },
          });

          return {
            success: user ? true : false,
            message: user
              ? "User deleted successfully."
              : "Record to delete does not exist.",
          };
        } catch {
          throw error.createError(
            error.ErrorCode.DATABASE_ERROR,
            "There was an error deleting the user."
          );
        }
      },
    });
  },
});
