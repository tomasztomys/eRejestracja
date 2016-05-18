import { fetchData } from './fetchData';
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE
} from './ActionsTypes';

import localStorage from 'store';

export function loginSuccess(data, email, password) {
  localStorage.set('user', {
    login: email,
    password: password
  });

  let user = data.user;

  user.login = data.login;
  return {
    type: LOGIN_SUCCESS,
    data: user
  };
}

export function loginFailure() {
  return {
    type: LOGIN_FAILURE,
    data: {
      message: 'Some error with login'
    }
  };
}

export function logoutSuccess() {
  localStorage.remove('user');

  return {
    type: LOGOUT_SUCCESS,
  };
}

export function tryLogin(email, password, dispatch) {
  let url = '/authorizations';
  let body = JSON.stringify({
    email,
    password
  });

  return fetchData(url, 'POST', body, '')
    .then((data) => {
      switch(data.status) {
        case 200: {
          dispatch(loginSuccess(data.data, email, password));
          return true;
        }
        default: {
          dispatch(loginFailure());
          return false;
        }
      }
    });
}

export function logout(dispatch) {
  dispatch(logoutSuccess());
  return true;
}