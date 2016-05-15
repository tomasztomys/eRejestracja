import * as ActionsTypes from '../actions/ActionsTypes';

export default function warningMessage(state, action) {
  switch(action.type) {
    case ActionsTypes.ADD_PERSON_FAILURE: {
      return {
        active: true,
        message: action.data.message
      };
    }
  }

  return state;
}
