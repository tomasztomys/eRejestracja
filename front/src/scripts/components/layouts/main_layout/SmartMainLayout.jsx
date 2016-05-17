import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import MainLayout from './MainLayout';
import * as UserReducer from '../../../reducers/user';

export default class SmartProfileEdition extends Component {
  render() {
    let { user } = this.props;

    return (
      <MainLayout
        user={ user }
        userType="admin"
      >
        { this.props.children }
      </MainLayout>
    );
  }
}

SmartProfileEdition.propTypes = {
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

export default connect(select)(SmartProfileEdition);
