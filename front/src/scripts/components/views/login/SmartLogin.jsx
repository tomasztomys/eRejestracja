import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as Action from '../../../actions/Actions';

import Login from './Login';
import Paths from '../../../constants/PathsConstants';

class SmartLogin extends Component {
  constructor() {
    super();

    this.state = {
      values: {
        email: '',
        password: '',
      },
      labels: {
        email: 'Email',
        password: 'Password',
        loginButton: 'Sign in',
      },
      errorMessages: {
        email: 'Please enter your email.',
        password: 'Please enter your password.'
      },
      errors: {
        email: '',
        password: ''
      },
      modalInput: {
        value: '',
        label: 'Email',
        error: '',
        errorMessage: 'Please enter your password.'
      },
      showForgotPassword: false
    };
  }
  showErrors() {
    let { errorMessages, errors, values } = this.state;

    for (let key in values) {
      if (values[key].length === 0) {
        errors[key] = errorMessages[key];
      }
    }

    this.setState({
      errors,
      showForgotPassword: true
    });
  }

  _logInHandle() {
    let { values } = this.state;
    let { email, password } = values;

    if (email.length > 0 && password.length > 0) {
      Action.tryLogin(email, password, this.props.dispatch).then((data) => {
        if (data) {
          this.context.router.push(Paths.dashboard);
        }
        else {
          this.setState({
            showForgotPassword: true
          });
        }
      });
    }
    else {
      this.showErrors();
    }
  }

  _onInputChange(type, value) {
    let { values, errors, errorMessages } = this.state;

    values[type] = value;
    errors[type] = value.length === 0 ? errorMessages[type] : '';
    this.setState({
      values: values,
      errors: errors
    });
  }

  onResetPassword() {
    let { modalInput } = this.state;

    if (modalInput.value.length > 0) {
      this.props.dispatch(Action.resetPassword(modalInput.value));
      modalInput.value = '';
      modalInput.error = '';
    }
    else {
      modalInput.error = modalInput.errorMessage;
    }

    this.setState({
      showForgotPassword: false,
      modalInput
    });
  }

  onChangeModalValues(value) {
    let { modalInput } = this.state;

    modalInput.value = value;
    modalInput.error = value.length === 0 ? modalInput.errorMessages : '';
    this.setState({
      modalInput
    });
  }

  render() {
    return (
      <Login
        inputChange={ this._onInputChange.bind(this) }
        logInHandle={ this._logInHandle.bind(this) }
        onResetPassword={ this.onResetPassword.bind(this) }
        onChangeModalValues={ this.onChangeModalValues.bind(this) }
        { ...this.state }
      />
    );
  }
}

SmartLogin.contextTypes = {
  router: React.PropTypes.object
};

export default connect()(SmartLogin);
