import React, { Component, PropTypes } from 'react';

import {
  Grid,
  GridItem,
} from 'ui';

import { ChangePasswordBox } from '../../view_content/change_password_box';
import { PersonDataBox } from '../../view_content/person_data_box';
import { DoctorSpecificBox } from '../../view_content/doctor_specific_box';

export default class PersonEdition extends Component {

  constructor() {
    super();

    this.state = {
      values: {
        name: '',
        surname: '',
        email: '',
        pesel: '',
        password: '',
        repeatPassword: '',
        oldPassword: '',
        specialization: ''
      },
      errors: {
        name: '',
        surname: '',
        email: '',
        pesel: '',
        password: '',
        repeatPassword: '',
        oldPassword: '',
        specialization: ''
      },
      errorsMessages: {
        name: 'Enter name.',
        surname: 'Enter surname.',
        email: 'Enter email.',
        pesel: 'Enter pesel.',
        password: 'Enter password',
        repeatPassword: 'Enter password again',
        oldPassword: 'Enter your old password',
        specialization: 'Enter specialization'
      }
    };
  }
  componentDidMount() {
    let { values } = this.props;

    this.setState({
      values
    });
  }

  onChange(type, value) {
    let { values } = this.state;

    values[type] = value;
    this.setState({
      values
    });
  }
  onSave(values) {
    this.props.onSave(values);
  }
  render() {
    let { values, errors } = this.state;
    let { personType, changePassword } = this.props;

    return (
      <Grid center>
        <GridItem
          xsSize="11"
          mdSize="5"
        >
          <PersonDataBox
            values={ values }
            errors={ errors }
            onChange={ this.onChange.bind(this) }
            onSave={ this.onSave.bind(this, values) }
            personType={ personType }
          />
        </GridItem>
        { changePassword ?
          <GridItem
            xsSize="11"
            mdSize="5"
          >
            <ChangePasswordBox
              values={ values }
              errors={ errors }
              onChange={ this.onChange.bind(this) }
              onSave={ this.onSave.bind(this, values) }
              oldPassword
            />
          </GridItem> : null
        }

        { personType === 'doctor' ?
          <GridItem
            xsSize="11"
            mdSize="5"
          >
            <DoctorSpecificBox
              values={ values }
              errors={ errors }
              onChange={ this.onChange.bind(this) }
              onSave={ this.onSave.bind(this, values) }
            />
          </GridItem> : null
        }
      </Grid>
    );
  }

}

PersonEdition.propTypes = {
  personType: PropTypes.string,
  values: PropTypes.object,
  onSave: PropTypes.func
};
