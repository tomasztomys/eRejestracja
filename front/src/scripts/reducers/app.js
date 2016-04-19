import Immutable, { List as IList, Map as IMap } from 'immutable';

import logIn from './log_in';
import doctorsList from './doctors';

const initialState = Immutable.fromJS({
  login: false,
  user: IMap({

  }),
  doctors: IList()
});

export default function app(state = initialState, action) {
  state = state.set('login', logIn(state.get('login'), action));
  state = state.set('doctors', doctorsList(state.get('doctors'), action));
  return state;
}
