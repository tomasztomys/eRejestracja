import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { ResetPassword } from '../views/reset_password';
import * as Action from '../../../../actions/Actions';
import * as UserReducer from '../../../../reducers/user';

export default class SmartResetPassword extends Component {
  onChangePassword(values) {
    let { query } = this.props.location;
    let token = query ? query.token : null;

    this.props.dispatch(Action.setNewPassword(token, values.password));
  }

  render() {
    return (
      <ResetPassword
        onChangePassword={ this.onChangePassword.bind(this) }
      />
    );
  }
}

export default connect()(SmartResetPassword);
