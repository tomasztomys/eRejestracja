import * as ActionsTypes from '../actions/ActionsTypes';

export default function informationMessage(state, action) {
  switch(action.type) {
    case ActionsTypes.CLEAN_INFORMATION_MESSAGE: {
      return {
        active: false,
        message: ''
      };
    }
    case ActionsTypes.ADD_PERSON_SUCCESS: {
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
  return state.informationMessage;
}
