import * as ActionsTypes from '../actions/ActionsTypes';

export default function warningMessage(state, action) {
  switch(action.type) {
    case ActionsTypes.CLEAN_WARNING_MESSAGE: {
      return {
        active: false,
        message: ''
      };
    }
    case ActionsTypes.ADD_PERSON_FAILURE: {
      return {
        active: true,
        message: action.data.message
      };
    }
    default: {
      return {
        active: false,
        message: ''
      };
    }
  }
}

export function getData(state) {
  return state.warningMessage;
}
