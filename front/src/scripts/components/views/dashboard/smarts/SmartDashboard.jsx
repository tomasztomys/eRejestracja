import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Dashboard from '../Dashboard';
import * as UserReducer from '../../../../reducers/user';

export default class SmartDashboard extends Component {
  render() {
    let { user, userType } = this.props;

    return (
      <Dashboard
        user={ user }
        userType={ userType }
      >
        { this.props.children }
      </Dashboard>
    );
  }
}

SmartDashboard.propTypes = {
  children: PropTypes.node,
  user: PropTypes.shape({
    name: PropTypes.string,
    surname: PropTypes.string,
    email: PropTypes.string,
  }),
  userType: PropTypes.oneOf([ 'admin', 'patient', 'doctor' ])
};

function select(state) {
  state = state.toJS();
  return {
    user: UserReducer.getUserData(state),
    userType: UserReducer.getUserType(state)
  };
}

export default connect(select)(SmartDashboard);
