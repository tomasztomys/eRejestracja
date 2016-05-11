import Immutable from 'immutable';
import * as Action from '../actions/Actions';

export default function doctors(state, action) {

  switch(action.type) {
    case Action.GET_DOCTORS_LIST:
      return Immutable.fromJS(action.data);
  }

  return state;
}
