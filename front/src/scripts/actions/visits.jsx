import { fetchData, checkManyStatus } from './fetchData';

import {
  GET_VISITS_LIST_SUCCESS,
  GET_VISITS_LIST_FAILURE
} from './ActionsTypes';

export function getVisitsListSuccess(data) {
  return {
    type: GET_VISITS_LIST_SUCCESS,
    data
  };
}

export function getVisitsList(id, userType) {
  let type = userType === 'doctor' ? '/doctors' : '/patients';
  let url = `/${ type }/${ id }/visits`;

  return (dispatch) => {
    fetchData(url, 'GET', {}, '')
    .then((data) => {
      if (data.status === 200) {
        dispatch(getVisitsListSuccess(data.data));
      }
    });
  };
}