import React, { Component, PropTypes } from 'react';

import {
  Grid,
  GridItem
} from 'lib/grid';

import { ChangePasswordBox } from '../../view_content/change_password_box';

import style from './reset_password.scss';

export default class ResetPassword extends Component {

  constructor() {
    super();

    this.state = {
      values: {
        password: '',
        repeatPassword: '',
      },
      errors: {
        password: '',
        repeatPassword: '',
      },
      errorsMessages: {
        password: 'Enter password',
        repeatPassword: 'Enter password again',
      },
    };
  }

  onChange(type, value) {
    let { values } = this.state;

    values[type] = value;
    this.setState({
      values
    });
  }

  onChangePassword(values) {
    this.props.onChangePassword(values);
  }

  render() {
    let { values, errors } = this.state;

    return (
      <Grid
        className={ style['reset-password'] }
        xsPosition="top"
        smPosition="middle"
        center
      >
        <GridItem
          xsSize="11"
          mdSize="6"
        >
          <ChangePasswordBox
            values={ values }
            errors={ errors }
            onChange={ this.onChange.bind(this) }
            onSave={ this.onChangePassword.bind(this, values) }
          />
        </GridItem>
      </Grid>
    );
  }

}

ResetPassword.propTypes = {
  onChangePassword: PropTypes.func,
};
