import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { PersonEdition } from '../views/person_edition';
import * as Action from '../../../../actions/Actions';
import * as PatientsReducer from '../../../../reducers/patients';

import Paths from '../../../../constants/PathsConstants';

export default class SmartPatientEdition extends Component {

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
      pesel: values.pesel,
      email: values.email,
      password: values.password,
    };

    this.props.dispatch(Action.changePatientProfile(parameters));
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

SmartPatientEdition.contextTypes = {
  router: React.PropTypes.object
};

function select(state) {
  state = state.toJS();
  return {
    doctors: PatientsReducer.getPatientsList(state)
  };
}

SmartPatientEdition.propTypes = {
  doctors: PropTypes.array
};

SmartPatientEdition.defaultProps = {
  doctors: []
};

export default connect(select)(SmartPatientEdition);