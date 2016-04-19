import React, { Component, PropTypes } from 'react';

import {
  Input,
  Button
} from '../../ui';

export default class Login extends Component {

  render() {
    let { labels, values, errors, inputChange, logInHandle } = this.props;

    return (
      <div>
        <Input
          key={ labels.login }
          label={ labels.login }
          value={ values.login }
          error={ errors.login }
          onChange={ inputChange.bind(this, 'login') }
        />
        <Input
          key={ labels.password }
          label={ labels.password }
          value={ values.password }
          error={ errors.password }
          onChange={ inputChange.bind(this, 'password') }
        />
        <Button
          label={ labels.loginButton }
          onClick={ logInHandle.bind(this) }
        />
      </div>
    );
  }
}

Login.propTypes = {
  labels: PropTypes.shape({
    login: PropTypes.string,
    password: PropTypes.string,
    loginButton: PropTypes.string
  }),
  values: PropTypes.shape({
    login: PropTypes.string,
    password: PropTypes.string
  }).isRequired,
  errors: PropTypes.shape({
    login: PropTypes.string,
    password: PropTypes.string
  }),
  inputChange: PropTypes.func,
  logInHandle: PropTypes.func
};