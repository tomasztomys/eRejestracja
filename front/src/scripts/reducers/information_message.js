import Immutable from 'immutable';
import * as ActionsTypes from '../actions/ActionsTypes';

export default function informationMessage(state, action) {
  switch(action.type) {
    case ActionsTypes.DELETE_DOCTORS_SUCCESS:
    case ActionsTypes.DELETE_PATIENTS_SUCCESS:
    case ActionsTypes.CHANGE_PROFILE_SUCCESS:
    case ActionsTypes.CHANGE_USER_PASSWORD_SUCCESS:
    case ActionsTypes.CHANGE_DOCTOR_PROFILE_SUCCESS:
    case ActionsTypes.CHANGE_PATIENT_PROFILE_SUCCESS:
    case ActionsTypes.ADD_WORK_HOURS_SUCCESS:
    case ActionsTypes.DELETE_WORK_HOURS_SUCCESS:
    case ActionsTypes.ADD_VISIT_SUCCESS:
    case ActionsTypes.ADD_PERSON_SUCCESS: {
      let informationMessage = Immutable.fromJS({
        active: false,
        message: ''
      });

      if (action.data && action.data.message) {
        informationMessage = informationMessage.set('active', true);
        informationMessage = informationMessage.set('message', action.data.message);
      }
      return informationMessage;
    }
    case ActionsTypes.CLEAN_INFORMATION_MESSAGE:
    default: {
      return {
        active: false,
        message: ''
      };
    }
  }
}

export function getData(state) {
  return state.informationMessage;
}
