import { nexusPrisma } from "nexus-plugin-prisma";
import { makeSchema, declarativeWrappingPlugin } from "nexus";
import path from "path";
import * as types from "../core";

const schema = makeSchema({
  types: types,
  plugins: [declarativeWrappingPlugin(), nexusPrisma({})],
  shouldGenerateArtifacts: true,
  outputs: {
    schema: path.resolve("./") + "/src/schema.graphql",
    typegen: path.resolve("./") + "/src/generated/nexus.ts",
  },
  sourceTypes: {
    modules: [
      {
        module: "@prisma/client",
        alias: "prisma",
      },
    ],
  },
  features: {
    abstractTypeStrategies: {
      resolveType: false,
    },
  },
});

export default schema;
