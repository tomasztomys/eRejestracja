import Immutable from 'immutable';
import * as Action from '../actions/Actions';

export default function logIn(state, action) {
  switch(action.type) {
    case Action.USER_LOG_IN:
      return Immutable.fromJS(action.data);
  }

  return state;
}

export function getUserData(state) {
  return state.user;
}
