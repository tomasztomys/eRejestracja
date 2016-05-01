import React, { Component, PropTypes } from 'react';

import {
  Input,
} from '../../../../ui';

import style from './person_data.scss';

export default class PersonData extends Component {
  constructor() {
    super();

    this.state = {
      labels: {
        name: 'Name',
        surname: 'Surname',
        email: 'Email',
        pesel: 'Pesel',
        saveButton: 'Save'
      },
      errors: {
        name: '',
        surname: '',
        email: '',
        pesel: '',
      },
      errorsMessages: {
        name: 'Enter name',
        surname: 'Enter surname',
        email: 'Enter email',
        pesel: 'Enter Pesel'
      }
    };
  }

  _onChangeInput(type, value) {
    let { errors, errorsMessages } = this.state;

    errors[type] = value.length > 0 ? '' : errorsMessages[type];
    this.setState({
      errors
    });

    this.props.onInputChange(type, value);
  }

  render() {
    let { labels, errors } = this.state;
    let { values } = this.props;

    return (
      <div className={ style['change-person-data'] }>
        <Input
          key={ labels.name }
          label={ labels.name }
          errors={ errors.name }
          value={ values.name }
          onChange={ this._onChangeInput.bind(this, 'name') }
        />
        <Input
          key={ labels.surname }
          label={ labels.surname }
          errors={ errors.surname }
          value={ values.surname }
          onChange={ this._onChangeInput.bind(this, 'surname') }
        />
        <Input
          key={ labels.email }
          label={ labels.email }
          errors={ errors.email }
          value={ values.email }
          onChange={ this._onChangeInput.bind(this, 'email') }
        />
        <Input
          key={ labels.pesel }
          label={ labels.pesel }
          errors={ errors.pesel }
          value={ values.pesel }
          onChange={ this._onChangeInput.bind(this, 'pesel') }
        />
      </div>
    );
  }
}

PersonData.propTypes = {
  values: PropTypes.object,
  onInputChange: PropTypes.func,
};