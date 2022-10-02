import { ApolloServer } from "apollo-server-express";
import schema from "./schema";
import db from "./prismaClient";
import config from "../../config";
import { validateToken } from "../core/utils/auth.helper";

export default async (app: any) => {
  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const token = req.headers.authorization || "";

      // Try to retrieve a user with the token
      let user;
      try {
        user = await validateToken(token);
      } catch {
        return {
          token: token,
          req: req,
          db: db,
        };
      }

      return {
        token: token,
        user: user,
        req: req,
        db: db,
      };
    },
  });
  await server.start();

  const path = config.development.graphqlPath;
  server.applyMiddleware({
    app,
    path,
    bodyParserConfig: {
      limit: "10mb",
    },
  });

  return app;
};
