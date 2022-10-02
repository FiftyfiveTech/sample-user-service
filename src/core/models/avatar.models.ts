import { objectType } from "@nexus/schema";

const avatar = objectType({
  name: "avatar",
  definition(table) {
    table.nonNull.string("key");
    table.nonNull.string("url");
  },
});

export { avatar };
