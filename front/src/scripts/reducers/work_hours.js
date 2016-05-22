import Immutable from 'immutable';
import * as ActionsTypes from '../actions/ActionsTypes';

export default function workHours(state, action) {
  switch(action.type) {
    case ActionsTypes.GET_WORK_HOURS_SUCCESS: {
      return Immutable.fromJS(action.data);
    }
    default: {
      return state;
    }
  }
}

export function getUserWorkHours(state) {
  return state.workHours;
}