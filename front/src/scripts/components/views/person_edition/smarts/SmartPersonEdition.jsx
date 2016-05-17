import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { PersonEdition } from '../views/person_edition';
import * as Action from '../../../../actions/Actions';
import * as UserReducer from '../../../../reducers/user';
import * as DoctorsReducer from '../../../../reducers/doctors';

export default class SmartPersonEdition extends Component {
  onSave(values) {
    let { personType, userId } = this.props;
    let parameters = {
      id: userId,
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
      <div>{this.props.params.id} darek</div>

    );
  }
}

function select(state) {
  state = state.toJS();
  DoctorsReducer.getDoctorData(state, 1);

  return {
    personType: UserReducer.getUserType(state),
    values: UserReducer.getUserData(state),
    userId: UserReducer.getUserId(state)
  };
}

SmartPersonEdition.propTypes = {
  personType: PropTypes.oneOf([ 'patient', 'doctor', 'admin' ]),
  values: PropTypes.object,
  userId: PropTypes.number
};

export default connect(select)(SmartPersonEdition);
