import Immutable, { List as IList, Map as IMap } from 'immutable';

import user from './user';
import doctors from './doctors';
import patients from './patients';
// import errors from './errors';

const initialState = Immutable.fromJS({
  user: {
    data: {},
    fetchSuccess: false
  },
  doctorsList: [],
});

export default function app(state = initialState, action) {
  state = state.set('user', user(state.get('user'), action));
  state = state.set('doctors', doctors(state.get('doctors'), action));
  state = state.set('patients', patients(state.get('patients'), action));

  return state;
}
