import Immutable from 'immutable';

import logIn from './log_in';

const initialState = Immutable.fromJS({
  user: {
    nick: '',
    password: '',
    type: ''
  }
});

export default function app(state = initialState, action) {
  state = state.set('user', logIn(state.get('user'), action));
  return state;
}
