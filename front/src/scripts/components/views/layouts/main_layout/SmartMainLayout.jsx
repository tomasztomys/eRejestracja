import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import MainLayout from './MainLayout';
import * as UserReducer from '../../../../reducers/user';

export default class SmartProfileEdition extends Component {
  render() {
    return (
      <MainLayout
        name={ this.props.user.name }
        surname={ this.props.user.surname }
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
    surname: PropTypes.string
  })
};

function select(state) {
  state = state.toJS();
  return {
    user: UserReducer.getUserData(state)
  };
}

export default connect(select)(SmartProfileEdition);
