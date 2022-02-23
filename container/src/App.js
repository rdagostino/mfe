import { createGenerateClassName, StylesProvider } from '@material-ui/core/styles';
import { createBrowserHistory } from 'history';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import Header from './components/Header';
import Progress from './components/Progress';

const AuthApp = lazy(() => import('./components/AuthApp'));
const MarketingApp = lazy(() => import('./components/MarketingApp'));
const DashboardApp = lazy(() => import('./components/DashboardApp'));

const generateClassName = createGenerateClassName({
  productionPrefix: 'co',
});

const history = createBrowserHistory();

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      history.push('/dashboard');
    }
  }, [isSignedIn]);

  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)} />
        <Suspense fallback={<Progress />}>
          <Switch>
            <Route path='/auth'>
              <AuthApp onSignIn={() => setIsSignedIn(true)} />
            </Route>
            <Route path='/dashboard'>
              {!isSignedIn && <Redirect to='/' />}
              <DashboardApp />
            </Route>
            <Route path='/' component={MarketingApp} />
          </Switch>
        </Suspense>
      </StylesProvider>
    </Router>
  );
};
