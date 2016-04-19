import { fetchData } from './fetchData';

export const GET_DOCTORS_LIST = 'GET_DOCTORS_LIST';

export function addDoctorsList(data) {
  return {
    type: GET_DOCTORS_LIST,
    data: data
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