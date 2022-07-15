import React from 'react';
import { BrowserRouter as Router, Switch,  Route } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import SearchPlaces from './pages/SearchPlaces';
import SavedPlaces from './pages/SavedPlaces';
import Signup from './pages/Signup';
import Home from './pages/Home';
//import { Navbar } from 'react-bootstrap';

//<Route exact path='/' component={SearchPlaces} />
//<Route exact path='/saved' component={SavedPlaces} />

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
      <Navbar />
        <Switch>
        <Route exact path='/' component={Home} />
          
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/' component={SearchPlaces} />
          <Route exact path='/saved' component={SavedPlaces} />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Switch>
        
        <Footer/>
      </>
    </Router>
  </ApolloProvider>
  );
}

export default App;
