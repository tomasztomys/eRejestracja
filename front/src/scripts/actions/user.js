import { fetchData } from './fetchData';
import Qs from 'qs';
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  CHANGE_USER_PASSWORD_SUCCESS,
  CHANGE_USER_PASSWORD_FAILURE,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  SET_NEW_PASSWORD_SUCCESS,
  SET_NEW_PASSWORD_FAILURE,
  CONFIRM_EMAIL_SUCCESS
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

export function logoutFailure() {
  return {
    type: LOGOUT_FAILURE,
    data: {
      message: 'Some error with logout.'
    }
  };
}

export function changeUserPasswordSuccess() {
  localStorage.remove('user');

  return {
    type: CHANGE_USER_PASSWORD_SUCCESS,
    data: {
      message: 'Password changed correctly.'
    }
  };
}

export function changeUserPasswordFailure() {
  return {
    type: CHANGE_USER_PASSWORD_FAILURE,
    data: {
      message: 'Some error with change your password.'
    }
  };
}

export function resetPasswordSuccess() {
  return {
    type: RESET_PASSWORD_SUCCESS,
    data: {
      message: 'We send email with link to reset your password.'
    }
  };
}

export function setNewPasswordSuccess() {
  return {
    type: SET_NEW_PASSWORD_SUCCESS,
    data: {
      message: 'Your password was changed. Now you can log in with new password.'
    }
  };
}

export function confirmEmailSuccess() {
  return {
    type: CONFIRM_EMAIL_SUCCESS,
    data: {
      message: 'Your email wass confirm. Now you can sign in.'
    }
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

export function resetPassword(email) {
  let parameters = {
    email
  };
  let url = '/user/reset_password?' + Qs.stringify(parameters, { arrayFormat: 'brackets' });

  return (dispatch) => {
    fetchData(url, 'GET', {}, '')
    .then((data) => {
      if (data.status === 200) {
        dispatch(resetPasswordSuccess());
      }
    });
  };
}

export function logout(dispatch) {
  dispatch(logoutSuccess());
  return true;
}

export function changeUserPassword(parameters, userId) {
  let url = `/user/${ userId }/password`;
  let body = JSON.stringify(
    parameters
  );

  return (dispatch) => {
    fetchData(url, 'PUT', body, '')
    .then((data) => {
      if (data.status === 200) {
        dispatch(changeUserPasswordSuccess());
      }
    });
  };
}

export function setNewPassword(token, newPassword) {
  let url = `/user/new_password`;
  let body = JSON.stringify({
    token,
    new_password: newPassword
  });

  return (dispatch) => {
    fetchData(url, 'POST', body, '')
    .then((data) => {
      if (data.status === 200) {
        dispatch(setNewPasswordSuccess());
      }
    });
  };
}

export function confirmEmail(token, dispatch) {
  let parameters = {
    token
  };

  let url = '/user/confirm_email?' + Qs.stringify(parameters, { arrayFormat: 'brackets' });

  return fetchData(url, 'GET', {}, '')
    .then((data) => {
      if (data.status === 200) {
        dispatch(confirmEmailSuccess());
        return true
      }
      return false
    });
}