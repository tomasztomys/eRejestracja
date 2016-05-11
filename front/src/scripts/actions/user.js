import { fetchData } from './fetchData';
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from './ActionsTypes';

export function loginSuccess(data) {
  let user = data.user;

  user.login = data.login;
  return {
    type: LOGIN_SUCCESS,
    data: user
  };
}

export function login(email, password) {
  let url = '/authorizations';
  let body = JSON.stringify({
    email,
    password
  });

  return (dispatch) => {
    fetchData(url, 'POST', body, '')
    .then((data) => {
      dispatch(loginSuccess(data));
    });
  };
}