import React from 'react'
import {
  Router,
  Route,
  IndexRoute,
  Redirect,
  browserHistory
} from 'react-router'
import store from 'store'
import Paths from '../constants/PathsConstants'

import App from './App'

import { Login } from './views/login'
import { Navigation } from './views/navigation'

export default class Routes extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router history={ browserHistory }>
        <Redirect from={ Paths.root } to={ Paths.navigation } />
        <Route path={ Paths.root } component={ App }>
          <Route path={ Paths.navigation } component={ Navigation } />
          <Route path={ Paths.login } component={ Login } />
        </Route>
        <Redirect from={ Paths.notFound } to={ Paths.root } />
      </Router>
    );
  }
}