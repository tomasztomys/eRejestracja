import Immutable from 'immutable';
import * as ActionsTypes from '../actions/ActionsTypes';

export default function user(state, action) {
  switch(action.type) {
    case ActionsTypes.LOGIN_SUCCESS:
      return Immutable.fromJS({
        data: action.data,
        fetchSuccess: true
      });
  }

  return state;
}

export function getUserData(state) {
  if (!state.user.data) {
    return null;
  }

  let { data } = state.user;

  return {
    name: data.name || '',
    surname: data.surname || '',
    email: data.email || '',
    pesel: data.pesel || '',
    password: data.password || '',
    repeatPassword: '',
    oldPassword: '',
    specialization: data.specialization || ''
  };
}

export function getUserType(state) {
  if (state.user.data) {
    return state.user.data.type;
  }
  return null;
}