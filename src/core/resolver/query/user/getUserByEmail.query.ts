import { extendType } from "@nexus/schema";

const GetUserByEmailQuery = extendType({
  type: "Query",
  definition: (table) => {
    //Get user by Email
    table.field("getUserByEmail", {
      type: "User",
      args: {
        email: "String",
      },
      resolve: async (root, args, ctx) =>
        ctx.db.User.findUnique({
          where: {
            email: args.email?.toLowerCase(),
          },
        }),
    });
  },
});

export { GetUserByEmailQuery };
