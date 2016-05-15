import { fetchData } from './fetchData';
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE
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

export function tryLogin(email, password) {
  let url = '/authorizations';
  let body = JSON.stringify({
    email,
    password
  });

  return (dispatch) => {
    fetchData(url, 'POST', body, '')
    .then((data) => {
      if (data.status === 200) {
        dispatch(loginSuccess(data.data, email, password));
      }
    });
  };
}