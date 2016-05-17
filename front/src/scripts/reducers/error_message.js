import * as ActionsTypes from '../actions/ActionsTypes';

export default function errorMessage(state, action) {
  switch(action.type) {
    case ActionsTypes.LOGIN_FAILURE:
    case ActionsTypes.ADD_PERSON_FAILURE: {
      return {
        active: true,
        message: action.data.message
      };
    }
    case ActionsTypes.CLEAN_ERROR_MESSAGE:
    default: {
      return {
        active: false,
        message: ''
      };
    }
  }
}

export function getData(state) {
  return state.errorMessage;
}
