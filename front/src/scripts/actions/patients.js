import { fetchData } from './fetchData';

export const GET_PATIENTS_LIST = 'GET_PATIENTS_LIST';
export const REMOVE_PATIENT = 'REMOVE_PATIENT';

export function addPatientsList(data) {
  return {
    type: GET_PATIENTS_LIST,
    data: data
  };
}

export function fetchPatientsList() {
  let url = '/patients';
  // Qs.stringify(object, { arrayFormat: 'brackets' }
  // let body = JSON.stringify({
  // });

  return (dispatch) => {
    fetchData(url, 'GET', {}, '')
    .then((data) => {
      dispatch(addPatientsList(data));
    });
  };
}

export function deletePatient(id) {
  let url = '/patients/' + id;

  return (dispatch) => {
    fetchData(url, 'DELETE', {}, '')
    .then((data) => {
      dispatch(fetchPatientsList());
    });
  };
}