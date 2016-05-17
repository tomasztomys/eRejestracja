import Immutable from 'immutable';
import * as ActionsTypes from '../actions/ActionsTypes';

export default function doctors(state, action) {
  switch(action.type) {
    case ActionsTypes.GET_DOCTORS_LIST_SUCCESS: {
      return Immutable.fromJS(action.data);
    }
    case ActionsTypes.DELETE_DOCTORS_SUCCESS: {
      let ids = action.data.ids;
      return state.filter((item) => {
        return ids.indexOf(item.get('id')) === -1;
      });
    }
    default: {
      return state;
    }
  }
}

export function getDoctorsList(state) {
  return state.doctors;
}

export function getDoctorData(state, id) {
  console.log(state.doctors);
  let doctor = state.doctors.filter((item) => {
    return id === item.id;
  });

  console.log(doctor);
}