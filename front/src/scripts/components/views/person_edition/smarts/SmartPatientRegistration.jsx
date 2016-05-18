import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SmartAddPatient } from './';

import Paths from '../../../../constants/PathsConstants';

class SmartPatientRegistration extends Component {
  nextStep() {
    this.context.router.push(Paths.root);
  }

  render() {
    return (
      <SmartAddPatient
        title="Patient registration"
        buttonAddLabel="Sign up"
        nextStep={ this.nextStep.bind(this) }
        registration
      />
    );
  }
}

SmartPatientRegistration.contextTypes = {
  router: React.PropTypes.object
};

export default connect()(SmartPatientRegistration);