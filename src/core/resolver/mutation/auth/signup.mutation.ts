import { extendType } from "@nexus/schema";
import { Role } from "@prisma/client";
import { authHelper, error } from "../../../utils";

const SignupMutation = extendType({
  type: "Mutation",
  definition: (table) => {
    //SignUp
    table.field("signup", {
      type: "userCreationResponse",
      args: {
        user: "signupQueryInputType",
      },
      resolve: async (root, args, ctx) => {
        const email = args.user?.email.trim().toLowerCase() ?? "";
        const firstName = args.user?.firstName.trim() ?? "";
        const lastName = args.user?.lastName.trim() ?? "";
        const role = args.user?.role as Role;

        if (!authHelper.validateEmail(email as string)) {
          throw error.createError(
            error.ErrorCode.VALIDATION_FAILED,
            `${email} is not valid email id`
          );
        }
        const existingUser = await ctx.db.User.findUnique({
          where: { email: email },
        });
        if (existingUser) {
          throw error.createError(error.ErrorCode.EMAIL_ALREADY_IN_USE, [
            email,
          ]);
        }
        const password = await authHelper.hashPassword(args.user?.password!);
        try {
          const user: any = await ctx.db.User.create({
            data: {
              email: email,
              password: password,
              firstName: firstName,
              lastName: lastName,
              role: role,
            },
          });

          return {
            email: user.email,
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role as "ADMIN" | "MANAGER",
          };
        } catch {
          throw error.createError(
            error.ErrorCode.UNKNOWN,
            "An error ocurred while creating new user."
          );
        }
      },
    });
  },
});

export { SignupMutation };
