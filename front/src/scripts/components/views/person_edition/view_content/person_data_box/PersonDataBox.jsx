import React, { Component, PropTypes } from 'react';

import {
  CardWithClosing,
} from 'ui';

import { PersonData } from '../../subcomponents/person_data';

import style from './person_data_box.scss';

export default class PersonDataBox extends Component {
  render() {
    let {
      values,
      errors,
      onChange,
      onSave,
      personType,
      open,
      onToogleBox
    } = this.props;

    let actions = [
      {
        label: 'Save',
        onClick: onSave
      }
    ];

    return (
      <CardWithClosing className={ style['person-data'] }
        title="Chane profile data"
        subtitle={ 'Please write real personal data.' }
        actions={ actions }
        open={ open }
        onToogleBox={ onToogleBox }
      >
        <PersonData
          values={ values }
          errors={ errors }
          onChange={ onChange }
          personType={ personType }
        />
      </CardWithClosing>
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

PersonDataBox.propTypes = {
  values: PropTypes.shape(PropTypesStructure),
  errors: PropTypes.shape(PropTypesStructure),
  onChange: PropTypes.func,
  personType: PropTypes.oneOf([ 'patient', 'doctor', 'admin' ]),
  onSave: PropTypes.func,
  open: PropTypes.bool,
  onToogleBox: PropTypes.func
};
