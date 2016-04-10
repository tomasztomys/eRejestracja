import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  user: {}
});

export default function app(state = initialState) {
  return state;
}
