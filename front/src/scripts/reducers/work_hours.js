import Immutable from 'immutable';
import * as ActionsTypes from '../actions/ActionsTypes';

export default function workHours(state, action) {
  switch(action.type) {
    case ActionsTypes.GET_WORK_HOURS_SUCCESS: {
      return Immutable.fromJS(action.data);
    }
    case ActionsTypes.DELETE_WORK_HOURS_SUCCESS: {
      let terms = state.get('terms').filter((item) => {
        return (item.get('id') !== action.data.id);
      });

      return Immutable.fromJS({
        terms,
        doctorId: state.get('doctorId')
      });
    }
    default: {
      return state;
    }
  }
}

export function getUserWorkHours(state) {
  let terms = state.workHours.terms.map((item) => {
    return {
      id: item.id,
      doctorId: item.doctor_id,
      start: new Date(item.from),
      end: new Date(item.to)
    };
  });

  let doctorId = state.workHours.doctorId;

  return {
    terms,
    doctorId
  };
}