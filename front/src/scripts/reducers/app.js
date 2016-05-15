import Immutable from 'immutable';

import user from './user';
import doctors from './doctors';
import patients from './patients';
import addPerson from './add_person';

const initialState = Immutable.fromJS({
  user: {
    data: {},
    fetchSuccess: false
  },
  doctors: [],
  patients: []
});

export default function app(state = initialState, action) {
  state = state.set('user', user(state.get('user'), action));
  state = state.set('doctors', doctors(state.get('doctors'), action));
  state = state.set('patients', patients(state.get('patients'), action));
  state = addPerson(state, action);

  return state;
}
