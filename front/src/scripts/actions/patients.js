import { fetchData, checkManyStatus } from './fetchData';

import {
  DELETE_PATIENTS_SUCCESS,
  DELETE_PATIENTS_FAILURE,
  GET_PATIENTS_LIST_SUCCESS,
  GET_PATIENTS_LIST_FAILURE
} from './ActionsTypes';

export function getPatientsListSuccess(data) {
  return {
    type: GET_PATIENTS_LIST_SUCCESS,
    data: data
  };
}

export function deletePatientsSuccess(ids) {
  let patientType = ids.length > 0 ? 'patients' : 'patient';

  return {
    type: DELETE_PATIENTS_SUCCESS,
    data: {
      ids: ids,
      message: `The ${ patientType } removed properly`
    }
  };
}

export function fetchPatientsList() {
  let url = '/patients';

  return (dispatch) => {
    fetchData(url, 'GET', {}, '')
    .then((data) => {
      if (data.status === 200) {
        dispatch(getPatientsListSuccess(data.data));
      }
    });
  };
}

export function deletePatients(ids) {
  let urls = ids.map((item) => {
    return `/patients/${ item }`;
  });

  return (dispatch) => {
    fetchData(urls, 'DELETE', {}, '')
    .then((data) => {
      if (checkManyStatus(data.status, 200)) {
        dispatch(deletePatientsSuccess(ids));
      }
    });
  };
}