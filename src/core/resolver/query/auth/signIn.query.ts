import { extendType, nullable } from "@nexus/schema";
import { authHelper, error, JWT } from "../../../utils";

const SignInQuery = extendType({
  type: "Query",
  //SignIn
  definition: (table) => {
    table.field("signIn", {
      type: "signInResponse",
      args: {
        email: "String",
        password: "String",
        role: nullable("role"),
      },
      resolve: async (root, args, ctx) => {
        const email = args.email?.trim().toLowerCase();
        if (!authHelper.validateEmail(email as string)) {
          throw error.createError(error.ErrorCode.VALIDATION_FAILED, [
            `${email} is not valid email id`,
          ]);
        }
        const user = await ctx.db.User.findUnique({ where: { email } });
        if (!user) {
          throw error.createError(error.ErrorCode.USER_NOT_FOUND, [email]);
        }

        await authHelper.comparePassword(args.password!, user.password);

        const userTokenPayload = {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          gender: user.gender,
          role: user.role,
        };

        const token = JWT.createToken(userTokenPayload);

        return { user, token };
      },
    });
  },
});

export { SignInQuery };
