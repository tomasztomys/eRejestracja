import { fetchData } from './fetchData';
import Qs from 'qs';

import {
  CHANGE_PROFILE_SUCCESS,
  CHANGE_PROFILE_FAILURE
} from './ActionsTypes';

export function changeProfileDataSuccess(person, type) {
  person.type = type;
  return {
    type: CHANGE_PROFILE_SUCCESS,
    data: {
      message: 'Profile data change correctly',
      person
    }
  };
}

export function changeProfileData(parameters, type) {
  let userType = '';

  switch(type) {
    case 'doctor':
      userType = 'doctors';
      break;
    case 'patient':
      userType = 'patients';
      break;
    case 'admin':
      userType = 'admins';
      break;
  }

  let url = `/${ userType }/${ parameters.id }`;
  let body = JSON.stringify(
    parameters
  );

  return (dispatch) => {
    fetchData(url, 'PUT', body, '')
    .then((data) => {
      dispatch(changeProfileDataSuccess(parameters, type));
    });
  };
}