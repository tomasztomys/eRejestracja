import React, { Component, PropTypes } from 'react';

import {
  Grid,
  GridItem
} from 'lib/grid';

import { ChangePasswordBox } from '../../view_content/change_password_box';
import { PersonDataBox } from '../../view_content/person_data_box';
import { DoctorSpecificBox } from '../../view_content/doctor_specific_box';

import { checkData, checkValidations, mergeObjects } from 'utilities';

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
      },
      validations: {
        name: true,
        surname: true,
        email: true,
        pesel: true,
        password: false,
        repeatPassword: false,
        oldPassword: false,
        specialization: true
      },
      openBoxes: {
        personData: true,
        changePassword: false,
        doctorSpecific: false
      }
    };
  }

  componentDidMount() {
    this.setInitialValues(this.props.values);
  }

  componentWillReceiveProps(nextProps) {
    this.setInitialValues(nextProps.values);
  }

  setInitialValues(values) {
    if (values) {
      this.setState({
        values
      });
    }
  }

  onChange(type, value) {
    let { values, errors, errorsMessages, validations } = this.state;

    let validation = (value.length > 0 || value > 0);
    errors[type] = validation ? '' : errorsMessages[type];
    validations[type] = validation;
    values[type] = value;


    this.setState({
      values,
      errors,
      validations
    });
  }

  onToogleBox(type) {
    let { openBoxes } = this.state;

    openBoxes[type] = !openBoxes[type];

    this.setState({
      openBoxes
    });
  }

  onSavePersonData() {
    let { values, errors, errorsMessages, validations } = this.state;
    let personValidation = {};
    personValidation.name = validations.name;
    personValidation.surname = validations.surname;
    personValidation.email = validations.email;
    if ( this.props.personType === 'patient') {
      personValidation.pesel = validations.pesel;
    }

    let data = checkValidations(personValidation, errors, errorsMessages);
    errors = mergeObjects(errors, data.errors);

    this.setState({
      errors
    });

    if (data.status) {
      this.props.onSave(values);
    }
  }

  onSave(values) {
    this.props.onSave(values);
  }

  onSavePassword() {
    let { values, errors, errorsMessages, validations } = this.state;

    let passwordValidation = {};
    passwordValidation.password = validations.password;
    passwordValidation.repeatPassword = validations.repeatPassword;
    passwordValidation.oldPassword = validations.oldPassword;

    let data = checkValidations(passwordValidation, errors, errorsMessages);
    errors = mergeObjects(errors, data.errors);

    this.setState({
      errors
    });
    if (data.status && values.password === values.repeatPassword) {
      this.props.onChangePassword(values);

    }
  }

  render() {
    let { values, errors, openBoxes } = this.state;
    let { personType, changePassword } = this.props;

    return (
      <div>
        <Grid center>
          <GridItem
            xsSize="11"
            smSize="9"
            mdSize="7"
            lgSize="6"
          >
            <PersonDataBox
              values={ values }
              errors={ errors }
              onChange={ this.onChange.bind(this) }
              onSave={ this.onSavePersonData.bind(this) }
              personType={ personType }
              onToogleBox={ this.onToogleBox.bind(this, 'personData') }
              open={ openBoxes.personData }
            />
          </GridItem>
        </Grid>
        { changePassword ?
          <Grid center>
            <GridItem
              xsSize="11"
              smSize="9"
              mdSize="7"
              lgSize="6"
            >
              <ChangePasswordBox
                values={ values }
                errors={ errors }
                onChange={ this.onChange.bind(this) }
                onSave={ this.onSavePassword.bind(this)}
                onToogleBox={ this.onToogleBox.bind(this, 'changePassword') }
                open={ openBoxes.changePassword }
                oldPassword
              />
            </GridItem>
          </Grid> : null
        }
        { personType === 'doctor' ?
          <Grid center>
            <GridItem
              xsSize="11"
              smSize="9"
              mdSize="7"
              lgSize="6"
            >
              <DoctorSpecificBox
                values={ values }
                errors={ errors }
                onChange={ this.onChange.bind(this) }
                onSave={ this.onSave.bind(this, values) }
                onToogleBox={ this.onToogleBox.bind(this, 'doctorSpecific') }
                open={ openBoxes.doctorSpecific }
              />
            </GridItem>
          </Grid> : null
        }
      </div>
    );
  }

}

PersonEdition.propTypes = {
  personType: PropTypes.string,
  values: PropTypes.object,
  onSave: PropTypes.func,
  onChangePassword: PropTypes.func,
  changePassword: PropTypes.bool
};
