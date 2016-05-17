import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SmartAddDoctor } from './';

class SmartDoctorRegistration extends Component {
  render() {
    return (
      <SmartAddDoctor
        title="Doctor registration"
        buttonAddLabel="Sign up"
        registration
      />
    );
  }
}

export default connect()(SmartDoctorRegistration);