// import fetch from 'isomorphic-fetch';
// import Qs from 'qs';
//
// import AppConfig from '../AppConfig';
// import {fetchData} from './fetchData';
//
// export const USER_LOG_IN = 'USER_LOG_IN';
//
// export function getLogIn(data) {
//   return {
//     type: USER_LOG_IN,
//     data: data
//   };
// }
//
// export function sendLogIn(email, password) {
//   let url = '/authorizations';
//   let body = JSON.stringify({
//     email,
//     password
//   });
//
//   // return (dispatch) => fetchData(url, 'POST', body, userToken)
//   //   .then((data) => {
//   //     dispatch(getLogIn(data));
//   //   });
// }