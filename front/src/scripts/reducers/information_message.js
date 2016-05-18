import * as ActionsTypes from '../actions/ActionsTypes';

export default function informationMessage(state, action) {
  switch(action.type) {
    case ActionsTypes.DELETE_DOCTORS_SUCCESS:
    case ActionsTypes.DELETE_PATIENT_SUCCESS:
    case ActionsTypes.CHANGE_PROFILE_SUCCESS:
    case ActionsTypes.CHANGE_DOCTOR_PROFILE_SUCCESS:
    case ActionsTypes.ADD_PERSON_SUCCESS: {
      return {
        active: true,
        message: action.data.message
      };
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
