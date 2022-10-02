import { extendType } from "@nexus/schema";
import { error } from "../../../utils";
import { validateToken } from "../../../utils/auth.helper";

const GetUserByTokenQuery = extendType({
  type: "Query",
  //SignIn
  definition: (table) => {
    table.field("getUserByToken", {
      type: "userTokenResponse",
      args: {
        token: "String",
      },
      resolve: async (root, args, ctx) => {
        const token = args?.token as string;
        if (!token) {
          throw error.createError(error.ErrorCode.INVALID_TOKEN);
        }

        try {
          const userId = validateToken(token);

          const user = await ctx.db.User.findUnique({
            where: { id: userId },
          });
          if (!user) {
            throw error.createError(error.ErrorCode.NOT_AUTHENTICATED);
          }
          return {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
          };
        } catch (err) {
          throw err;
        }
      },
    });
  },
});

export { GetUserByTokenQuery };
