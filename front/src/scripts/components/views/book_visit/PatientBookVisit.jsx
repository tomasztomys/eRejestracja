import React, { Component, PropTypes } from 'react';

import {
  Grid,
  GridItem
} from '../../ui';

import {
  DoctorPickerBox,
  TermPickerBox,
  VisitDescriptionBox
} from './subcomponents';

export default class PatientBookVisit extends Component {
  constructor() {
    super();
    this.state = {
      disabled: {
        doctorPicker: false,
        datePicker: true,
        descriptionBox: true
      },
      sources: {
        time: [
          {
            label: '6:15',
            value: '6/15'
          },
          {
            label: '6:30',
            value: '6/30'
          },
          {
            label: '7:45',
            value: '7/45'
          },
          {
            label: '8:00',
            value: '8/00'
          }
        ],
        doctors: [
          {
            name: 'Natalia Nowak',
            workDaysDescription: 'WorkDays: Mon 15:00-17:15, Wen 15:00-19:00',
            id: 15
          },
          {
            name: 'Bartosz Bąk',
            workDaysDescription: 'WorkDays: Thu 12:00-14:15, Fri 13:00-18:00',
            id: 16
          },
          {
            name: 'Tomasz Lewandowski',
            workDaysDescription: 'WorkDays: Mon 10:00-17:00, Wen 10:00-19:00',
            id: 21
          }
        ],
        specializations: [
          {
            name: 'Chirurg',
            value: 'surgeon'
          },
          {
            name: 'Pediatra',
            value: 'pediatrician'
          },
          {
            name: 'Dentysta',
            value: 'dentist'
          }
        ]
      }
    };
  }

  _onAcceptDoctor() {
    let { disabled } = this.state;

    disabled.doctorPicker = true;
    disabled.datePicker = false;

    this.setState({
      disabled
    });
  }

  _onAcceptTerm() {
    let { disabled } = this.state;

    disabled.datePicker = true;
    disabled.descriptionBox = false;

    this.setState({
      disabled
    });
  }

  _onSignUp() {
    this.props.signUp();
  }

  render() {
    let { sources, disabled } = this.state;
    let { values, onChange } = this.props;

    return (
      <div>
        <Grid center>
          <GridItem xsSize="6">
            <DoctorPickerBox
              selectedDoctorId={ values.doctor }
              selectedSpecialization={ values.specialization }
              sources={ sources }
              onDoctorChange={ onChange.bind(this, 'doctor') }
              onSpecializationChange={ onChange.bind(this, 'specialization') }
              onAccept={ this._onAcceptDoctor.bind(this) }
              disabled={ disabled.doctorPicker }
            />
          </GridItem>
        </Grid>
        <Grid center>
          <GridItem xsSize="6">
            <TermPickerBox
              selectedDate={ values.date }
              onDateChange={ onChange.bind(this, 'date') }
              availableTimes={ sources.time }
              selectedTime={ values.time }
              onTimeChange={ onChange.bind(this, 'time') }
              onAccept={ this._onAcceptTerm.bind(this) }
              disabled={ disabled.datePicker }
            />
          </GridItem>
        </Grid>
        <Grid center>
          <GridItem xsSize="6">
            <VisitDescriptionBox
              visitDescription={ values.description }
              onDescriptionChange={ onChange.bind(this, 'description') }
              disabled={ disabled.descriptionBox }
              onAccept={ this._onSignUp.bind(this) }
            />
          </GridItem>
        </Grid>
      </div>
    );
  }
}

PatientBookVisit.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func,
  signUp: PropTypes.func
};