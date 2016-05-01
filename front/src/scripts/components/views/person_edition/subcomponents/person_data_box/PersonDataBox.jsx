import React, { Component, PropTypes } from 'react';

import {
  Input,
  Button,
  Card,
  CardTitle
} from '../../../../ui';

import style from './person_data_box.scss';

export default class PersonDataBox extends Component {
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

  _onSave() {
    this.props.onSave();
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
      <Card className={ style['person-data-box'] }>
        <CardTitle
          title="Personal data"
        />
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
        <Button
          label={ labels.saveButton }
          onClick={ this._onSave.bind(this) }
        />
      </Card>
    );
  }
}

PersonDataBox.propTypes = {
  values: PropTypes.object,
  onSave: PropTypes.func,
  onInputChange: PropTypes.func,
};