import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import {
  Input,
  Button,
  Card,
  CardTitle,
  Dialog
} from 'lib/ui';

import {
  Grid,
  GridItem
} from 'lib/grid';

import style from './login.scss';

export default class Login extends Component {

  constructor() {
    super();
    this.state = {
      forgotPasswordModalActive: false
    };
  }

  handleToogleResetPasswordModal() {
    this.setState({
      forgotPasswordModalActive: !this.state.forgotPasswordModalActive
    });
  }

  onResetPassword() {
    this.handleToogleResetPasswordModal();
    this.props.onResetPassword();
  }

  renderResetPasswordModal() {
    let { forgotPasswordModalActive } = this.state;
    let {
      modalInput,
      onChangeModalValues
    } = this.props;

    let actions = [
      { label: 'Cancel', onClick: this.handleToogleResetPasswordModal.bind(this) },
      { label: 'Reset password', onClick: this.onResetPassword.bind(this) }
    ];

    return (
      <Dialog
        actions={ actions }
        active={ forgotPasswordModalActive }
        onOverlayClick={ this.handleToogleResetPasswordModal.bind(this) }
        title=" Reset Password"
      >
        <Input
          key={ modalInput.label }
          label={ modalInput.label }
          value={ modalInput.value }
          icon="email"
          error={ modalInput.error }
          onChange={ onChangeModalValues.bind(this) }
        />
      </Dialog>
    );
  }

  render() {
    let {
      labels,
      values,
      errors,
      inputChange,
      logInHandle,
      showForgotPassword,
    } = this.props;

    return (
      <div>
        {/* MODALS */}
        { this.renderResetPasswordModal() }
        {/* --------- */}
        <Grid
          className={ style['login'] }
          xsPosition="top"
          smPosition="middle"
          center
        >
          <GridItem
            xsSize="12"
            smSize="6"
            mdSize="4"
          >
            <Card
              className={ style['login-card'] }
            >
              <CardTitle
                className={ style['login-card-title'] }
                title="SIGN IN"
              />
              <div className={ style['login-card-body'] }>
                <Input
                  key={ labels.email }
                  label={ labels.email }
                  value={ values.email }
                  icon="email"
                  error={ errors.email }
                  onChange={ inputChange.bind(this, 'email') }
                />
                <Input
                  key={ labels.password }
                  label={ labels.password }
                  value={ values.password }
                  icon="lock"
                  error={ errors.password }
                  type="password"
                  onChange={ inputChange.bind(this, 'password') }
                />
                <p
                  className={
                    classnames(
                      style['forgot-password'],
                      { [style['show']]: showForgotPassword }
                    )
                  }
                >
                  <a onClick={ this.handleToogleResetPasswordModal.bind(this) }>
                    I forgot my password.
                  </a>
                </p>
              </div>
              <div>
                <Button
                  className={ style['login-card-button'] }
                  label={ labels.loginButton }
                  onClick={ logInHandle.bind(this) }
                />
              </div>
            </Card>
          </GridItem>
        </Grid>
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
  logInHandle: PropTypes.func,
  showForgotPassword: PropTypes.bool,
  onResetPassword: PropTypes.func,
  modalInput: PropTypes.object,
  onChangeModalValues: PropTypes.func
};