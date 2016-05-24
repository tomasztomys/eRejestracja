import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { PersonRegistration } from '../views/person_registration';
import * as Action from '../../../../actions/Actions';

import Paths from '../../../../constants/PathsConstants';

class SmartAddDoctor extends Component {
  onAddUser(values) {
    let parameters = {
      name: values.name,
      surname: values.surname,
      email: values.email,
      password: values.password,
      specialization: values.specialization
    };

    Action.addUser(parameters, 'doctor', this.props.dispatch).then((data) => {
      if (data) {
        if (this.props.nextStep) {
          this.props.nextStep();
        }
        else {
          this.context.router.push(Paths.doctors.list);
        }
      }
    });
  }

  render() {
    let { buttonAddLabel, registration } = this.props;

    return (
      <PersonRegistration
        personType="doctor"
        buttonAddLabel={ buttonAddLabel || 'Add doctor' }
        title={ this.props.title || 'Add doctor' }
        onAddUser={ this.onAddUser.bind(this) }
        registration={ registration }
      />
    );
  }
}

SmartAddDoctor.propTypes = {
  title: PropTypes.string,
  nextStep: PropTypes.func,
  buttonAddLabel: PropTypes.string,
  registration: PropTypes.bool
};

SmartAddDoctor.contextTypes = {
  router: React.PropTypes.object
};


export default connect()(SmartAddDoctor);