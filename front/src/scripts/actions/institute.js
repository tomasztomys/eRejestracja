import { fetchData, checkManyStatus } from './fetchData';

import {
  GET_INSTITUTE_DATA_SUCCESS,
  GET_INSTITUTE_DATA_FAILURE,
} from './ActionsTypes';

export function getInstituteDataSuccess(data) {
  return {
    type: GET_INSTITUTE_DATA_SUCCESS,
    data: data
  };
}

export function getInstituteData() {
  let url = '/institute';

  return (dispatch) => {
    fetchData(url, 'GET', {}, '')
    .then((data) => {
      if (data.status === 200) {
        dispatch(getInstituteDataSuccess(data.data));
      }
    });
  };
}