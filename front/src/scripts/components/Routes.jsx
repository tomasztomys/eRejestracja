import React from 'react';
import {
  Router,
  Route,
  Redirect,
  browserHistory
} from 'react-router';
import Paths from '../constants/PathsConstants';

import App from './App';

import { SmartLogin } from './views/login';
import { Navigation } from './views/navigation';

export default class Routes extends React.Component {

  render() {
    return (
      <Router history={ browserHistory }>
        <Redirect
          from={ Paths.root }
          to={ Paths.navigation }
        />
        <Route
          path={ Paths.root }
          component={ App }
        >
          <Route
            path={ Paths.navigation }
            component={ Navigation }
          />
          <Route
            path={ Paths.login }
            component={ SmartLogin }
          />
        </Route>
        <Redirect
          from={ Paths.notFound }
          to={ Paths.root }
        />
      </Router>
    );
  }
}
