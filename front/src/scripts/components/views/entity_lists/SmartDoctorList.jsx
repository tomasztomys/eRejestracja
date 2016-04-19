import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as Action from '../../../actions/Actions';

class SmartDoctorList extends Component {
  componentDidMount() {
    this.props.dispatch(Action.fetchDoctorsList());
  }

  render() {
    return (
      <div></div>
    );
  }
}

export default connect()(SmartDoctorList);
