import { fetchData } from './fetchData';
import Qs from 'qs';

export function changeProfileData(parameters, type) {
  console.log(type);
  let url = type === 'doctor' ? '/doctors' : '/patients';
  let body = JSON.stringify(
    parameters
  );

  return (dispatch) => {
    fetchData(url, 'PUT', body, '')
    .then((data) => {
      // dispatch(addDoctorToStore(data));
    });
  };
}