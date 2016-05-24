import Immutable from 'immutable';
import * as ActionsTypes from '../actions/ActionsTypes';

export default function visits(state, action) {
  switch(action.type) {
    case ActionsTypes.GET_VISITS_LIST_SUCCESS: {
      return Immutable.fromJS({
        visits: action.data.visits,
        personId: action.data.id
      });
    }
    case ActionsTypes.DELETE_VISIT_SUCCESS: {
      let visits = state.get('visits').filter((item) => {
        return (item.get('id') !== action.data.id);
      });

      return Immutable.fromJS({
        visits,
        personId: state.get('personId')
      });
    }
    default: {
      return state;
    }
  }
}

export function getVisitsData(state) {
  let visits = state.visitsData.visits.map((item) => {
    return {
      id: item.id,
      doctorId: item.doctor_id,
      patientId: item.patient_id,
      start: new Date(item.from),
      end: new Date(item.to)
    };
  });

  let personId = state.visitsData.personId;

  return {
    visits,
    personId
  };
}