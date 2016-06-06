import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import {
  Input,
  Button,
  Card,
  CardTitle,
} from 'lib/ui';

import {
  Grid,
  GridItem
} from 'lib/grid';

import style from './login.scss';

export default class ForgotPasswordModal extends Component {

  render() {
    let {
      labels,
      values,
      errors,
      inputChange,
      logInHandle,
      showForgotPassword
    } = this.props;

    return (
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
              ><a >I forgot my password.</a></p>
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

    );
  }
}

ForgotPasswordModal.propTypes = {
};