import {
  CLEAN_INFORMATION_MESSAGE
} from './ActionsTypes';

export function cleanInformationMessage() {
  return (dispatch) => {
    dispatch({
      type: CLEAN_INFORMATION_MESSAGE,
      data: {}
    });
  };
}