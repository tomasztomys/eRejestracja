import { createStore, compose, applyMiddleware } from 'redux';
import { persistState } from 'redux-devtools';
import thunkMiddleware from 'redux-thunk';

// simple localstorage manipulation
import localStorage from 'store';
import ReduxDevTools from './ReduxDevTools';
import app from './reducers/app';

import * as Action from './actions/Actions';
import AppConfig from './AppConfig';

function getDebugSessionKey() {
  const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);

  return (matches && matches.length > 0)? matches[1] : null;
}

let finalCreateStore = compose(
  applyMiddleware(thunkMiddleware),
  // Required! Enable Redux DevTools with the monitors you chose
  ReduxDevTools.instrument(),
  // Lets you write ?debug_session=<name> in address bar to persist debug sessions
  persistState(getDebugSessionKey())
)(createStore);

// there's only a single store
// in the whole application
let Store = finalCreateStore(app);

let userData = localStorage.get('user');

if (userData !== undefined) {
  Store.dispatch(Action.tryLogin(userData.login, userData.password));
}

export default Store;
