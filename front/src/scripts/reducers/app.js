import Immutable from 'immutable';

import logIn from './log_in';

const initialState = Immutable.fromJS({
  login: '',
  user: {

  }
});

export default function app(state = initialState, action) {
  state = state.set('login', logIn(state.get('login'), action));
  return state;
}
