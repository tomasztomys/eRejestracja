import { fetchData } from './fetchData';
import Qs from 'qs';

export const GET_DOCTORS_LIST = 'GET_DOCTORS_LIST';
export const REMOVE_DOCTOR = 'REMOVE_DOCTOR';

export function addDoctorsList(data) {
  return {
    type: GET_DOCTORS_LIST,
    data: data
  };
}

export function onRemoveDoctor(data) {
  console.log(data);
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
  console.log(id);
  let url = '/doctors/' + Qs.stringify({
    id
  }, { arrayFormat: 'brackets' });

  return (dispatch) => {
    fetchData(url, 'DELETE', {}, '')
    .then((data) => {
      dispatch(onRemoveDoctor(data));
    });
  };
}