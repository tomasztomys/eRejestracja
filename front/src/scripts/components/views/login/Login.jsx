import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Input
} from '../../ui';

import * as Action from '../../../actions/Actions';

class Login extends Component {

  constructor() {
    super();

    this.state = {
      values: {
        login: '',
        password: ''
      },
      labels: {
        login: 'Login',
        password: 'Password'
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

  _onInputChange(type, value) {
    let values = this.state.values;

    values[type] = value;

    this.setState({
      values: values
    });
  }

  _logIn() {
    this.props.dispatch(Action.sendLogIn('tomasz@tomys.pl', 'tomasz'));
  }

  render() {
    let labels = this.state.labels;
    let values = this.state.values;
    let errors = this.state.errors;

    return (
      <div>
        <Input
          key={ labels.login }
          label={ labels.login }
          value={ values.login }
          error={ errors.login }
          onChange={ this._onInputChange.bind(this, 'login') }
        />
        <Input
          key={ labels.password }
          label={ labels.password }
          value={ values.password }
          error={ errors.password }
          onChange={ this._onInputChange.bind(this, 'password') }
        />
        <button
          onClick={ this._logIn.bind(this) }
        />
      </div>
    );
  }
}

function select(state) {
  return {
  };
}

export default connect(select)(Login);
