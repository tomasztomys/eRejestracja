import { fetchData } from './fetchData';
import Qs from 'qs';

export function addUser(parameters, type) {
  let url = type === 'doctor' ? '/doctors' : '/patients';
  let body = JSON.stringify(
    parameters
  );

  return (dispatch) => {
    fetchData(url, 'POST', body, '')
    .then((data) => {
      // dispatch(addDoctorToStore(data));
    });
  };
}