import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { PersonEdition } from '../views/person_edition';
import * as Action from '../../../../actions/Actions';
import * as UserReducer from '../../../../reducers/user';
import * as DoctorsReducer from '../../../../reducers/doctors';

import Paths from '../../../../constants/PathsConstants';

export default class SmarDoctorEdition extends Component {

  componentWillMount() {
    let { doctors, params } = this.props;
    let doctor = this._getDoctor(doctors, params.id);

    this.setState({
      personType: doctor.type,
      values: doctor,
      userId: doctor.id
    });
  }

  _routeHandler(where) {
    this.context.router.push(where);
  }

  onSave(values) {
    let { personType, userId } = this.state;
    let parameters = {
      id: userId,
      name: values.name,
      surname: values.surname,
      email: values.email,
      password: values.password,
      specialization: values.specialization
    };

    this.props.dispatch(Action.changeDoctorProfile(parameters));
    // this._routeHandler(Paths.doctors.list);
  }

  _getDoctor(doctors, id) {
    return doctors.filter((item) => {
      return id == item.id;
    })[0];
  }

  render() {

    return (
      <PersonEdition
        personType={ this.state.personType }
        values={ this.state.values }
        onSave={ this.onSave.bind(this) }
      />
    );
  }
}

SmarDoctorEdition.contextTypes = {
  router: React.PropTypes.object
};

function select(state) {
  state = state.toJS();
  return {
    doctors: DoctorsReducer.getDoctorsList(state)
  };
}

SmarDoctorEdition.propTypes = {
  doctors: PropTypes.array
};

SmarDoctorEdition.defaultProps = {
  doctors: []
};

export default connect(select)(SmarDoctorEdition);
