import React, { Component, PropTypes } from 'react';

import {
  Input,
} from 'lib/ui';

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
    };
  }

  render() {
    let { labels } = this.state;
    let { values, errors, onChange, personType } = this.props;

    let peselError = (values.pesel.length === 0 || values.pesel.length === 9) ? '' : 'Pesel must have 9 characters';
    return (
      <div className={ style['change-person-data'] }>
        <Input
          key={ labels.name }
          label={ labels.name }
          error={ errors.name }
          value={ values.name }
          onChange={ onChange.bind(this, 'name') }
        />
        <Input
          key={ labels.surname }
          label={ labels.surname }
          error={ errors.surname }
          value={ values.surname }
          onChange={ onChange.bind(this, 'surname') }
        />
        <Input
          key={ labels.email }
          label={ labels.email }
          error={ errors.email }
          value={ values.email }
          onChange={ onChange.bind(this, 'email') }
        />

        { personType === 'patient' ?
          <Input
            key={ labels.pesel }
            label={ labels.pesel }
            error={ errors.pesel + peselError }
            value={ values.pesel }
            type="number"
            onChange={ onChange.bind(this, 'pesel') }
          /> : null }
      </div>
    );
  }
}

const PropTypesStructure = {
  name: PropTypes.string,
  surname: PropTypes.string,
  email: PropTypes.string,
  pesel: PropTypes.string,
  saveButton: PropTypes.string
};

PersonData.propTypes = {
  values: PropTypes.shape(PropTypesStructure),
  errors: PropTypes.shape(PropTypesStructure),
  onChange: PropTypes.func,
  personType: PropTypes.oneOf([ 'patient', 'doctor', 'admin' ])
};