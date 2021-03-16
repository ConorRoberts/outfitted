import { ApolloServer } from "apollo-server-micro";
import typeDefs from "../../graphql/schema";
import resolvers from "../../graphql/resolvers";
import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const server = new ApolloServer({ typeDefs, resolvers });
const handler = server.createHandler({ path: "/api/graphql" });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
