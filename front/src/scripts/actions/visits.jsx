import { fetchData, checkManyStatus } from './fetchData';

import {
  GET_VISITS_LIST_SUCCESS,
  GET_VISITS_LIST_FAILURE,
  ADD_VISIT_SUCCESS,
  ADD_VISIT_FAILURE
} from './ActionsTypes';

export function getVisitsListSuccess(data, id) {
  return {
    type: GET_VISITS_LIST_SUCCESS,
    data: {
      visits: data,
      id: id
    }
  };
}

export function getVisitsList(id, userType) {
  let type = userType === 'doctor' ? '/doctors' : '/patients';
  let url = `/${ type }/${ id }/visits`;

  return (dispatch) => {
    fetchData(url, 'GET', {}, '')
    .then((data) => {
      if (data.status === 200) {
        dispatch(getVisitsListSuccess(data.data, id));
      }
    });
  };
}

export function addVisitSuccess() {
  return {
    type: ADD_VISIT_SUCCESS,
    data: {
      message: 'Visit add correctly',
    }
  };
}

export function addVisit(parameters) {
  let url = '/visits';
  let body = JSON.stringify(parameters);

  return (dispatch) => {
    fetchData(url, 'POST', body, '')
    .then(() => {
      dispatch(addVisitSuccess());
    });
  };
}
