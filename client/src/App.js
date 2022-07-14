import React from 'react';
import { BrowserRouter as Router, Switch,  Route } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import SearchHotels from './pages/SearchHotels';
import SavedHotels from './pages/SavedHotels';
import Signup from './pages/Signup';
import Home from './pages/Home';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <>
        <Header />
        <Switch>
        <Route exact path='/' component={Home} />
          <Route exact path='/' component={SearchBooks} />
          <Route exact path='/saved' component={SavedBooks} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Switch>
        <Footer/>
      </>
    </Router>
  </ApolloProvider>
  );
}

export default App;
