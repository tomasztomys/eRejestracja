import Immutable from 'immutable';

import user from './user';
import doctors from './doctors';
import patients from './patients';
import addPerson from './add_person';
import workHours from './work_hours';
import visits from './visits';
import informationMessage from './information_message';
import errorMessage from './error_message';

const initialState = Immutable.fromJS({
  user: {
    data: {},
    fetchSuccess: false
  },
  doctors: [],
  patients: [],
  workHours: [],
  visits: [],
  informationMessage: {
    active: false,
    message: ''
  },
  errorMessage: {
    active: false,
    message: ''
  }
});

export default function app(state = initialState, action) {
  state = state.set('informationMessage', informationMessage(state.get('informationMessage'), action));
  state = state.set('errorMessage', errorMessage(state.get('errorMessage'), action));

  state = state.set('user', user(state.get('user'), action));
  state = state.set('doctors', doctors(state.get('doctors'), action));
  state = state.set('patients', patients(state.get('patients'), action));
  state = state.set('workHours', workHours(state.get('workHours'), action));
  state = state.set('visits', visits(state.get('visits'), action));

  return state;
}
