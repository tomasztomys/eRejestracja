import Immutable from 'immutable';
import * as ActionsTypes from '../actions/ActionsTypes';

export default function visits(state, action) {
  switch(action.type) {
    case ActionsTypes.GET_VISITS_LIST_SUCCESS: {
      return Immutable.fromJS(action.data);
    }
    default: {
      return state;
    }
  }
}

export function getUserVisits(state) {
  return state.visits;
}