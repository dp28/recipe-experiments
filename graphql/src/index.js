import express from "express";
import { fileURLToPath } from "url";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import { join, dirname } from "path";
import { loadSchemaSync } from "@graphql-tools/load";
import { addResolversToSchema } from "@graphql-tools/schema";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import * as data from "./data/index.js";
import { createDependencyContainer } from "./dependencyContainer.js";
import { buildResolvers } from "./data/resolvers.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 4000;

const schema = loadSchemaSync(join(__dirname, "./schema.graphql"), {
  loaders: [new GraphQLFileLoader()],
});

const dependencyContainer = createDependencyContainer();
data.register(dependencyContainer);

const resolvers = buildResolvers(dependencyContainer);

const executableSchema = addResolversToSchema({ schema, resolvers });

const app = express();
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: executableSchema,
    graphiql: true,
  })
);

app.listen(PORT);

console.log(`Running a GraphQL API server at http://localhost:${PORT}/graphql`);
