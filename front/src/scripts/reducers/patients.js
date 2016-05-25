import Immutable from 'immutable';
import * as ActionsTypes from '../actions/ActionsTypes';

export default function doctors(state, action) {
  switch(action.type) {
    case ActionsTypes.GET_PATIENTS_LIST_SUCCESS: {
      return Immutable.fromJS(action.data);
    }
    case ActionsTypes.DELETE_PATIENTS_SUCCESS: {
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

export function getPatientsList(state) {
  return state.patients;
}

export function getPatientsNames(state) {
  console.log('PATIENT');
  let outData = {};

  for (let person of state.patients) {
    outData[person.id] = `${ person.name } ${ person.surname }`;
  }

  return outData;
}