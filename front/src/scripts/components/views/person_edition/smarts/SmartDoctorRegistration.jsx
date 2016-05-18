import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SmartAddDoctor } from './';

import Paths from '../../../../constants/PathsConstants';

class SmartDoctorRegistration extends Component {
  nextStep() {
    this.context.router.push(Paths.root);
  }

  render() {
    return (
      <SmartAddDoctor
        title="Doctor registration"
        buttonAddLabel="Sign up"
        nextStep={ this.nextStep.bind(this) }
        registration
      />
    );
  }
}

SmartDoctorRegistration.contextTypes = {
  router: React.PropTypes.object
};

export default connect()(SmartDoctorRegistration);