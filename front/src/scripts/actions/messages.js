import {
  CLEAN_INFORMATION_MESSAGE,
  CLEAN_ERROR_MESSAGE
} from './ActionsTypes';

export function cleanInformationMessage() {
  return (dispatch) => {
    dispatch({
      type: CLEAN_INFORMATION_MESSAGE,
      data: {}
    });
  };
}

export function cleanWarningMessage() {
  return (dispatch) => {
    dispatch({
      type: CLEAN_ERROR_MESSAGE,
      data: {}
    });
  };
}