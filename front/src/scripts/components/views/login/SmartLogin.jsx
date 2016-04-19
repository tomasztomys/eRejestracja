import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as Action from '../../../actions/Actions';

import Login from './Login';

class SmartLogin extends Component {
  constructor() {
    super();

    this.state = {
      values: {
        login: 'tomasz@tomys.pl',
        password: 'tomasz',
      },
      labels: {
        login: 'Login',
        password: 'Password',
        loginButton: 'Sign in'
      },
      errorMessages: {
        login: 'Please enter your login.',
        password: 'Please enter your password.'
      },
      errors: {
        login: '',
        password: ''
      }
    };
  }

  _logInHandle() {
    let { login, password } = this.state.values;

    this.props.dispatch(Action.tryLogIn(login, password));
  }

  _onInputChange(type, value) {
    let values = this.state.values;

    values[type] = value;

    this.setState({
      values: values
    });
  }

  render() {
    return (
      <Login
        inputChange={ this._onInputChange.bind(this) }
        logInHandle={ this._logInHandle.bind(this) }
        { ...this.state }
      />
    );
  }
}

export default connect()(SmartLogin);
