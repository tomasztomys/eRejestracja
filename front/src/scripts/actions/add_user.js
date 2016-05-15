import { fetchData } from './fetchData';

import {
  ADD_PERSON_SUCCESS,
  ADD_PERSON_FAILURE
} from './ActionsTypes';

export function addUserSuccess() {
  return {
    type: ADD_PERSON_SUCCESS,
    data: {
      message: 'The person added correctly to the database.'
    }
  };
}

export function addUserFailure() {
  return {
    type: ADD_PERSON_FAILURE,
    data: {
      message: 'An error in adding this person to the database.'
    }
  };
}

export function addUser(parameters, type) {
  let url = type === 'doctor' ? '/doctors' : '/patients';
  let body = JSON.stringify(
    parameters
  );

  return (dispatch) => {
    fetchData(url, 'POST', body, '')
    .then((data) => {
      switch(data.status) {
        case 200: {
          addUserSuccess();
          break;
        }
        default: {
          addUserFailure();
        }
      }
      if (data.status === 200) {
        dispatch(addUserSuccess(data.data));
      }
    });
  };
}