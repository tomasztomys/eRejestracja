import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SmartAddPatient } from './';

class SmartPatientRegistration extends Component {
  render() {
    return (
      <SmartAddPatient
        title="Patient registration"
      />
    );
  }
}

export default connect()(SmartPatientRegistration);