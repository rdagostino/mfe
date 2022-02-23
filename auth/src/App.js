import { createGenerateClassName, StylesProvider } from '@material-ui/core';
import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import Signin from './components/Signin';
import Signup from './components/Signup';

const generateClassName = createGenerateClassName({
  productionPrefix: 'au',
});

const App = ({ history, onSignIn }) => {
  return (
    <StylesProvider generateClassName={generateClassName}>
      <Router history={history}>
        <Switch>
          <Route path='/auth/signin'>
            <Signin onSignIn={onSignIn} />
          </Route>
          <Route path='/auth/signup'>
            <Signup onSignIn={onSignIn} />
          </Route>
        </Switch>
      </Router>
    </StylesProvider>
  );
};

export default App;
