import Immutable, { List as IList,  Map as IMap} from 'immutable';

const initialState = Immutable.fromJS({
  user: {}
});

export default function app(state = initialState, action) {
  return state;
}
