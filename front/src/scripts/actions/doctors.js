import { fetchData, checkManyStatus } from './fetchData';
import Qs from 'qs';

import {
  DELETE_DOCTOR_SUCCESS,
  DELETE_DOCTOR_FAILURE,
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
    type: DELETE_DOCTOR_SUCCESS,
    data: {
      ids: ids
    }
  };
}

export function fetchDoctorsList() {
  let url = '/doctors';
  // Qs.stringify(object, { arrayFormat: 'brackets' }
  // let body = JSON.stringify({
  // });

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