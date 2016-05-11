import { fetchData } from './fetchData';
import Qs from 'qs';

export function changeProfileData(parameters, id, type) {
  let userType = '';

  switch(type) {
    case 'doctor':
      userType = 'doctors';
      break;
    case 'patient':
      userType = 'patients';
      break;
    case 'admin':
      userType = 'admins';
      break;
  }

  let url = `/${ userType }/${ id }`;
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