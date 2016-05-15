import {
  CLEAN_INFORMATION_MESSAGE,
  CLEAN_WARNING_MESSAGE
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
      type: CLEAN_WARNING_MESSAGE,
      data: {}
    });
  };
}