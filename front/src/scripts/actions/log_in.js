import { fetchData } from './fetchData';

export const USER_LOG_IN = 'USER_LOG_IN';

export function getLogIn(data) {
  return {
    type: USER_LOG_IN,
    data: data
  };
}

export function sendLogIn(email, password) {
  let url = '/authorizations';
  let body = JSON.stringify({
    email,
    password
  });

  return (dispatch) => fetchData(url, 'POST', body, '')
    .then((data) => {
      dispatch(getLogIn(data));
    });
}