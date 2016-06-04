import Immutable from 'immutable';
import * as ActionsTypes from '../actions/ActionsTypes';

export default function institute(state, action) {
  switch(action.type) {
    case ActionsTypes.GET_INSTITUTE_DATA_SUCCESS: {
      return Immutable.fromJS(action.data);
    }
    default: {
      return state;
    }
  }
}

export function getInstituteData(state) {
  return state.institute;
}