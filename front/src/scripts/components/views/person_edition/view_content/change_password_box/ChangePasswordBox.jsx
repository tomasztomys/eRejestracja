import React, { Component, PropTypes } from 'react';

import {
  Card,
  CardTitle
} from '../../../../ui';

import { ChangePassword } from '../../subcomponents/change_password';

import style from './change_password_box.scss';

export default class ChangePasswordBox extends Component {

  render() {
    let {
      values,
      onSaveNewPassword,
      onChangePasswordInputs,
    } = this.props;

    return (
      <Card className={ style['Person data'] }>
        <CardTitle
          title="Change your password"
          subtitle={ `The password Must be 8 to 20 characters in length,
             Must contain at least one letter and one number` }
        />
        <ChangePassword
          values={ values }
          onInputChange={ onChangePasswordInputs }
          onSave={ onSaveNewPassword }
          oldPassword
        />
      </Card>
    );
  }

}

ChangePasswordBox.propTypes = {
  values: PropTypes.object,
  changePasswordValues: PropTypes.array,
  onSaveNewPassword: PropTypes.func,
  onChangePasswordInputs: PropTypes.func
};
