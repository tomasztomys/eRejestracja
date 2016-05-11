import React, { Component, PropTypes } from 'react';

import {
  Input,
  Button,
  Card,
  CardTitle,
  Grid,
  GridItem
} from '../../ui';

import style from './login.scss';

export default class Login extends Component {

  render() {
    let { labels, values, errors, inputChange, logInHandle } = this.props;

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
                onChange={ inputChange.bind(this, 'password') }
              />
              <Button
                className={ style['login-card-body-button'] }
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