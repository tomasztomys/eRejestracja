import Immutable, { List as IList, Map as IMap } from 'immutable';

import logIn from './log_in';
import doctors from './doctors';
import patients from './patients';
// import errors from './errors';

const initialState = Immutable.fromJS({
  login: false,
  user: IMap({
  }),
  doctorsList: IList(),
  errors: IMap({
  })
});

export default function app(state = initialState, action) {
  state = state.set('errors', {});
  // state = state.set('errors', errors(state.get('errors'), action));
  state = state.set('login', logIn(state.get('login'), action));
  state = state.set('doctors', doctors(state.get('doctors'), action));
  state = state.set('patients', patients(state.get('patients'), action));

  return state;
}
