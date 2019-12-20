import React, { useContext } from 'react';
import { BrowserRouter } from "react-router-dom";
import { RoutesRoot } from "./RoutesRoot";
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from  'apollo-cache-inmemory';
import { ApolloClient, gql } from 'apollo-boost';
import { onError } from 'apollo-link-error';
import './App.scss';
import Header from './Header';
import Login from './Login';
import Anular from './Cerrar';
import { LoginModalContext } from './LoginModalContext';
import { CerrarModalContext } from './CerrarModalContext';

const link = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  link: createHttpLink({uri: '/graphql'}),
  cache: new InMemoryCache(),
  connectToDevTools: true,
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors)
    console.log('networkError', networkError)
  }
});

// client.query({query: gql`
//     {
//       codes {
//         _id    
//         codigo
//         descripcion
//         anulado
//         createdAt
//         updatedAt
//       }
//      }
//     `
//   })
//   .then(result => console.log(result.data.codes));

function App() {
  const {loginModal} = useContext(LoginModalContext);
  const {cerrarModal} = useContext(CerrarModalContext);
  return (
    <ApolloProvider client={client}>
      <div className='App'>
        <BrowserRouter>
          <Header/>
          <RoutesRoot />
        </BrowserRouter>
        { loginModal && <Login/> }
        { cerrarModal && <Anular/> }
      </div>
    </ApolloProvider>
  );
}

export default App;
export { client };