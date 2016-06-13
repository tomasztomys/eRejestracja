import { fetchData, checkManyStatus } from './fetchData';

import {
  GET_VISITS_LIST_SUCCESS,
  GET_VISITS_LIST_FAILURE,
  ADD_VISIT_SUCCESS,
  ADD_VISIT_FAILURE,
  DELETE_VISIT_SUCCESS,
  DELETE_VISIT_FAILURE,
} from './ActionsTypes';

export function getVisitsListSuccess(data, id) {
  console.log('wow');
  return {
    type: GET_VISITS_LIST_SUCCESS,
    data: {
      visits: data,
      id: id
    }
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

export function deleteVisitSuccess(id) {
  return {
    type: DELETE_VISIT_SUCCESS,
    data: {
      id: id,
      message: 'The visit removed properly'
    }
  };
}

export function getVisitsList(id, userType) {
  let type = userType === 'doctor' ? '/doctors' : '/patients';
  let url = `/${ type }/${ id }/visits`;

  console.log('run action');
  return (dispatch) => {
    fetchData(url, 'GET', {}, '')
    .then((data) => {
      if (data.status === 200) {
        console.log(data);
        dispatch(getVisitsListSuccess(data.data, id));

      }
    });
  };
}

export function addVisit(parameters, dispatch) {
  let url = '/visits';
  let body = JSON.stringify(parameters);

  return fetchData(url, 'POST', body, '')
    .then((data) => {
      if (data.status === 200) {
        dispatch(addVisitSuccess());
        return true;
      }
      else {
        return false;
      }
    });
}

export function deleteVisit(id) {
  let url = `/visits/${ id }`;

  return (dispatch) => {
    fetchData(url, 'DELETE', {}, '')
    .then((data) => {
      if (data.status === 200) {
        dispatch(deleteVisitSuccess(id));
      }
    });
  };
}
