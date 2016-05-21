import * as ActionsTypes from '../actions/ActionsTypes';
import Immutable from 'immutable';

export default function errorMessage(state, action) {
  switch(action.type) {
    case ActionsTypes.LOGIN_FAILURE:
    case ActionsTypes.CHANGE_USER_PASSWORD_FAILURE:
    case ActionsTypes.ADD_PERSON_FAILURE: {
      let errorMessage = Immutable.fromJS({
        active: false,
        message: ''
      });

      if (action.data && action.data.message) {
        errorMessage = errorMessage.set('active', true);
        errorMessage = errorMessage.set('message', action.data.message);
      }
      return errorMessage;
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
