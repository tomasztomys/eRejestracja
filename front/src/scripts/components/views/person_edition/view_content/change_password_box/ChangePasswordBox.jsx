import React, { Component, PropTypes } from 'react';

import {
  CardWithHeader,
} from 'ui';

import { ChangePassword } from '../../subcomponents/change_password';

import style from './change_password_box.scss';

export default class ChangePasswordBox extends Component {
  render() {
    let {
      values,
      errors,
      onSave,
      onChange,
    } = this.props;

    let actions = [
      {
        label: 'Save',
        onClick: onSave
      }
    ];

    return (
      <CardWithHeader
        className={ style['Person data'] }
        title="Change your password"
        subtitle={ `The password Must be 8 to 20 characters in length,
           Must contain at least one letter and one number` }
        actions={ actions }
      >
        <ChangePassword
          values={ values }
          errors={ errors }
          onChange={ onChange }
          oldPassword
        />
      </CardWithHeader>
    );
  }

}
const PropTypesStructure = {
  password: PropTypes.string,
  repeatPassword: PropTypes.string,
  oldPassword: PropTypes.string,
  saveButton: PropTypes.string,
};

ChangePasswordBox.propTypes = {
  values: PropTypes.shape(PropTypesStructure),
  errors: PropTypes.shape(PropTypesStructure),
  onChange: PropTypes.func,
  onSave: PropTypes.func,
};
