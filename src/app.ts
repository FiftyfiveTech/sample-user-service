import express from "express";
import cors from "cors";
import server from "./server/server";
import config from "../config";
import bodyParser from "body-parser";

// Create express server
const createServer = async () => {
  let app = express();
  app.use(cors());
  app.use(
    bodyParser.json({
      limit: "10mb",
    })
  );
  app = await server(app);

  // Add server port
  const port = Number(process.env.PORT || 8080);
  app.listen(port, () => {
    console.log(
      `\u{1F680} Server ready at http://localhost:${port}${config.development.graphqlPath}`
    );
  });
};

// Start server.
createServer();
