import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { SocketContext, socket } from './utils/socket';
import Header from './components/Header';
import Footer from './components/Footer';
import SignUpForm from './pages/SignUpForm'
import LoginForm from './pages/LoginForm'
import Profile from './pages/Profile'
import Game from './pages/Game'
import Home from './pages/Home'
import OOB from './pages/OOB'

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
      <SocketContext.Provider value={socket}>
        <Router>
          {/* <Header/> */}
          <Routes>
            <Route 
              exact path='/'
              element={<Home />}
            />
            <Route 
              path="/profile" 
              element={<Profile />} 
            />
            <Route 
              path="/signup" 
              element={<SignUpForm />} 
            />
            <Route 
              path="/login" 
              element={<LoginForm />} 
            />
            <Route 
              path='/game/:roomId'
              element={<Game />}
            />
            <Route 
              path='*'
              element={<OOB />}
            />
          </Routes>
          <Footer/>
        </Router>
      </SocketContext.Provider>
    </ApolloProvider>
  );
}

export default App;
