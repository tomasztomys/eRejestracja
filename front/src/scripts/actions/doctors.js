import { fetchData } from './fetchData';
import Qs from 'qs';

export const GET_DOCTORS_LIST = 'GET_DOCTORS_LIST';
export const REMOVE_DOCTOR = 'REMOVE_DOCTOR';
import {
  DELETE_DOCTOR_SUCCESS,
  DELETE_DOCTOR_FAILURE
} from './ActionsTypes';

export function addDoctorsList(data) {
  return {
    type: GET_DOCTORS_LIST,
    data: data
  };
}

export function deleteDoctorSuccess(ids) {
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
      dispatch(addDoctorsList(data));
    });
  };
}

export function deleteDoctor(id) {

  let url = `/doctors/${ id }`;

  return (dispatch) => {
    fetchData(url, 'DELETE', {}, '')
    .then((data) => {
      dispatch(deleteDoctorSuccess(id));
      // dispatch(fetchDoctorsList());
    });
  };
}