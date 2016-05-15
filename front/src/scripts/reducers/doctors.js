import Immutable from 'immutable';
import * as Action from '../actions/Actions';
import * as ActionsTypes from '../actions/ActionsTypes';

export default function doctors(state, action) {

  switch(action.type) {
    case Action.GET_DOCTORS_LIST: {
      return Immutable.fromJS(action.data);
    }
    case ActionsTypes.DELETE_DOCTOR_SUCCESS: {
      let ids = action.data.ids;
      let doctors = state;

      state.forEach((item, index) => {
        if (ids.indexOf(item.get('id')) > 0) {
          doctors.delete(index);
        }
      });
      console.log(state);
      console.log(doctors);
      // return Immutable.fromJS(action.data);
    }

  }

  return state;
}
