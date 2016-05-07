import Immutable from 'immutable';
import * as Action from '../actions/Actions';

export default function patients(state, action) {

  switch(action.type) {
    case Action.GET_PATIENTS_LIST:
      return Immutable.fromJS(action.data);
  }

  return state;
}
