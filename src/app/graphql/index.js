import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
} from "@apollo/client";
import { createAuthLink } from "aws-appsync-auth-link";
import aws_exports from "../../aws-exports";

const url = aws_exports.aws_appsync_graphqlEndpoint;
const region = aws_exports.aws_appsync_region;

const auth = {
  type: aws_exports.aws_appsync_authenticationType,
  apiKey: aws_exports.aws_appsync_apiKey,
};

const link = ApolloLink.from([
  createAuthLink({ url, region, auth }),
  createHttpLink({ uri: url }),
]);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
