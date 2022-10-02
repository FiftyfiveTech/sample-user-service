import { extendType } from "@nexus/schema";

const GetAllUserQuery = extendType({
  type: "Query",
  definition: (table) => {
    //Get All user
    table.list.field("getAllUser", {
      type: "User",
      args: {},
      resolve: async (root, args, ctx) => await ctx.db.User.findMany(),
    });
  },
});

export { GetAllUserQuery };
