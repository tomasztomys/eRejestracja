import { fetchData, checkManyStatus } from './fetchData';

import {
  ADD_WORK_HOURS_SUCCESS,
  ADD_WORK_HOURS_FAILURE,
  GET_WORK_HOURS_SUCCESS,
  GET_WORK_HOURS_FAILURE,
  DELETE_WORK_HOURS_SUCCESS,
  DELETE_WORK_HOURS_FAILURE
} from './ActionsTypes';

export function getWorkHoursSuccess(doctorId, data) {
  return {
    type: GET_WORK_HOURS_SUCCESS,
    data: {
      doctorId: doctorId,
      terms: data
    }
  };
}

export function addWorkHoursSuccess() {
  return {
    type: ADD_WORK_HOURS_SUCCESS,
    data: {
      message: 'Work hours add correctly',
    }
  };
}

export function deleteWorkHoursSuccess(id) {
  return {
    type: DELETE_WORK_HOURS_SUCCESS,
    data: {
      id: id,
      message: 'The work hours removed properly'
    }
  };
}

export function getWorkHours(id) {
  let url = `/doctors/${ id }/work_hours`;

  return (dispatch) => {
    fetchData(url, 'GET', {}, '')
    .then((data) => {
      if (data.status === 200) {
        dispatch(getWorkHoursSuccess(id, data.data));
      }
    });
  };
}

export function addWorkHours(data, id) {
  let url = `/doctors/${ id }/work_hours`;
  let body = JSON.stringify({
    work_hours: data
  });

  return (dispatch) => {
    fetchData(url, 'POST', body, '')
    .then(() => {
      dispatch(addWorkHoursSuccess());
    });
  };
}

export function deleteWorkHours(doctorId, id) {
  let url = `/doctors/${ doctorId }/work_hours/${ id }`;

  return (dispatch) => {
    fetchData(url, 'DELETE', {}, '')
    .then((data) => {
      if (data.status === 200) {
        dispatch(deleteWorkHoursSuccess(id));
      }
    });
  };
}