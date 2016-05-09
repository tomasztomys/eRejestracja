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
    };
  }

  render() {
    let { labels } = this.state;
    let { values, errors, onChange } = this.props;

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
        <Input
          key={ labels.pesel }
          label={ labels.pesel }
          error={ errors.pesel }
          value={ values.pesel }
          type="number"
          onChange={ onChange.bind(this, 'pesel') }
        />
      </div>
    );
  }
}

const structure = {
  name: PropTypes.string,
  surname: PropTypes.string,
  email: PropTypes.string,
  pesel: PropTypes.string,
  saveButton: PropTypes.string
};

PersonData.propTypes = {
  values: PropTypes.shape(structure),
  errors: PropTypes.shape(structure),
  onChange: PropTypes.func,
};