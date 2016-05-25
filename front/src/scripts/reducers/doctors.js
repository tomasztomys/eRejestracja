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

export function getDoctorsNames(state) {
  let outData = {};

  for (let person of state.doctors) {
    outData[person.id] = `${ person.name } ${ person.surname }`;
  }

  return outData;
}