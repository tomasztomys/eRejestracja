import { fetchData, checkManyStatus } from './fetchData';

import {
  DELETE_DOCTORS_SUCCESS,
  DELETE_DOCTORS_FAILURE,
  GET_DOCTORS_LIST_SUCCESS,
  GET_DOCTORS_LIST_FAILURE
} from './ActionsTypes';

export function getDoctorsListSuccess(data) {
  return {
    type: GET_DOCTORS_LIST_SUCCESS,
    data: data
  };
}

export function deleteDoctorsSuccess(ids) {
  return {
    type: DELETE_DOCTORS_SUCCESS,
    data: {
      ids: ids
    }
  };
}

export function fetchDoctorsList() {
  let url = '/doctors';

  return (dispatch) => {
    fetchData(url, 'GET', {}, '')
    .then((data) => {
      if (data.status === 200) {
        dispatch(getDoctorsListSuccess(data.data));
      }
    });
  };
}

export function deleteDoctors(ids) {
  let urls = ids.map((item) => {
    return `/doctors/${ item }`;
  });

  return (dispatch) => {
    fetchData(urls, 'DELETE', {}, '')
    .then((data) => {
      if (checkManyStatus(data.status, 200)) {
        dispatch(deleteDoctorsSuccess(ids));
      }
    });
  };
}