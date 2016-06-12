import { fetchData, checkManyStatus } from './fetchData';

import {
  GET_INSTITUTE_DATA_SUCCESS,
  GET_INSTITUTE_DATA_FAILURE,
  CHANGE_INSTITUTE_DATA_SUCCESS,
  CHANGE_INSTITUTE_DATA_FAILURE
} from './ActionsTypes';

export function getInstituteDataSuccess(data) {
  return {
    type: GET_INSTITUTE_DATA_SUCCESS,
    data
  };
}

export function changeInstituteDataSuccess(data) {
  return {
    type: CHANGE_INSTITUTE_DATA_SUCCESS,
    data: {
      message: 'Change institute contact data correctly',
      data
    }
  };
}

export function getInstituteData() {
  let url = '/institute';

  return (dispatch) => {
    fetchData(url, 'GET', {}, '')
    .then((data) => {
      if (data.status === 200) {
        dispatch(getInstituteDataSuccess(data.data));
      }
    });
  };
}

export function changeInstituteData(parameters) {
  let url = '/institute';
  let body = JSON.stringify(
    parameters
  );

  return (dispatch) => {
    fetchData(url, 'PUT', body, '')
    .then((data) => {
      if (data.status === 200) {
        dispatch(changeInstituteDataSuccess(parameters));
      }
    });
  };
}