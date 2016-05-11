import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { PersonEdition } from '../views/person_edition';
import * as Action from '../../../../actions/Actions';
import * as UserReducer from '../../../../reducers/user';

export default class SmartProfileEdition extends Component {
  onSave(values) {
    let { personType } = this.props;
    let parameters = {
      name: values.name,
      surname: values.surname,
      pesel: values.pesel,
      email: values.email,
      password: values.password,
      specialization: values.specialization
    };

    this.props.dispatch(Action.changeProfileData(parameters, personType));
  }
  render() {
    return (
      <PersonEdition
        personType={ this.props.personType }
        values={ this.props.values }
        onSave={ this.onSave.bind(this) }
      />
    );
  }
}

function select(state) {
  state = state.toJS();
  return {
    personType: UserReducer.getUserType(state),
    values: UserReducer.getUserData(state)
  };
}

SmartProfileEdition.propTypes = {
  personType: PropTypes.oneOf([ 'patient', 'doctor', 'admin' ]),
  values: PropTypes.object
};

export default connect(select)(SmartProfileEdition);
