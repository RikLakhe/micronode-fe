import {ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from} from '@apollo/client'
import { setContext } from '@apollo/client/link/context';
import {onError} from '@apollo/client/link/error';
import GetUsers from "./GetUsers";
import AddUser from "./AddUser";

import api from 'jira-agile-api-client';

import {GRAPHQL_URI} from '../constants/appConfig'


api.setSetting('headers', {
  'Access-Control-Allow-Origin': "*",
  "X-Atlassian-Token": "no-check",
  "Accept": "*/*",
  'Authorization': 'Basic '+btoa('rikeshshrestha@lftechnology.com:1tqTjoz6OsvnB2Y1CA6s7014')
});

api.board.getSprints(599).then(function (boards) {
  console.log(boards);
}).catch(function (error) {
  console.log(error);
});

const httpLink = new HttpLink({ uri: GRAPHQL_URI })

const middleware = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = "TEST";
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const authLink = middleware.concat(httpLink);

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const link = from([
  errorLink, authLink
])

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
})

function App() {
  return (
    <ApolloProvider client={client}>
      {" "}
      <AddUser />
      <GetUsers />
    </ApolloProvider>
  );
}

export default App;
