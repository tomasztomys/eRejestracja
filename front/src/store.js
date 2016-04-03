import { createStore, compose, applyMiddleware } from 'redux';
import { persistState } from 'redux-devtools';
import thunkMiddleware from 'redux-thunk';

// simple localstorage manipulation
import localStorage from 'store';
import ReduxDevTools from './ReduxDevTools';
import app from './reducers/app';

import * as Action from './actions/Actions';
import AppConfig from './AppConfig';

var finalCreateStore = compose(
  applyMiddleware(thunkMiddleware),
  // Required! Enable Redux DevTools with the monitors you chose
  ReduxDevTools.instrument(),
  // Lets you write ?debug_session=<name> in address bar to persist debug sessions
  persistState(getDebugSessionKey())
)(createStore);

function getDebugSessionKey() {
  const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
  return (matches && matches.length > 0)? matches[1] : null;
}

// there's only a single store
// in the whole application
var Store = finalCreateStore(app);


// if we already logged in previously
// get back all the login data
var userData = localStorage.get('user');
if (userData !== undefined && userData.authVersion == AppConfig.authVersion) {
  Store.dispatch(Action.trySigningIn(userData.username, userData.token));
}

if(userData && (userData.authVersion != AppConfig.authVersion)) {
  localStorage.remove('user');
}

export default Store;
