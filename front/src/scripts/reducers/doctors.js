import Immutable from 'immutable';
import * as Action from '../actions/Actions';
import * as ActionsTypes from '../actions/ActionsTypes';

export default function doctors(state, action) {

  switch(action.type) {
    case Action.GET_DOCTORS_LIST: {
      return Immutable.fromJS(action.data);
    }
    case ActionsTypes.DELETE_DOCTOR_SUCCESS: {
      let ids = action.data.ids;

      return state.filter((item) => {
        return ids.indexOf(item.get('id')) === -1;
      });
    }

  }

  return state;
}

export function getDoctorsList(state) {
  return state.doctors;
}