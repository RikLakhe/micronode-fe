import './App.css';
import {ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from} from '@apollo/client'
import {onError} from '@apollo/client/link/error';
import GetUsers from "./Components/GetUsers";
import AddUser from "./Components/AddUser";

const errorLink = onError(({graphqlErrors, networkError})=>{
  if(graphqlErrors){
    console.log("graphqlErrors",)
    graphqlErrors.map(({message,location,path})=>{
      alert(`Graphql Error ${message}`)
    })
  }
})

const link = from([
  errorLink,
  new HttpLink({uri: "http://localhost:7001/graphql"})
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
