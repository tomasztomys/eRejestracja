import { fetchData } from './fetchData';

import {
  ADD_PERSON_SUCCESS,
  ADD_PERSON_FAILURE
} from './ActionsTypes';

export function addUserSuccess() {
  return {
    type: ADD_PERSON_SUCCESS,
    data: {
      message: 'The person added correctly to the database. Please confirm email.'
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

export function addUser(parameters, type, dispatch) {
  let url = type === 'doctor' ? '/doctors' : '/patients';
  let body = JSON.stringify(
    parameters
  );

  return fetchData(url, 'POST', body, '')
    .then((data) => {
      switch(data.status) {
        case 200: {
          dispatch(addUserSuccess());
          return true;
        }
        default: {
          dispatch(addUserFailure());
          return false;
        }
      }
    });
}