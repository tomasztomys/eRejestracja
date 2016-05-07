import React, { Component, PropTypes } from 'react';

import {
  Grid,
  GridItem
} from '../../ui';

import { DoctorPickerBox } from './subcomponents/doctorPickerBox';

export default class PatientBookVisit extends Component {
  constructor() {
    super();
    this.state = {
      actives: {
        doctorPicker: true,
        datePicker: false
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
            specialization: 'Ortopeda',
            workDaysDescription: 'WorkDays: Mon 15:00-17:15, Wen 15:00-19:00',
            id: 15
          },
          {
            name: 'Bartosz Bąk',
            specialization: 'Chirurg',
            workDaysDescription: 'WorkDays: Thu 12:00-14:15, Fri 13:00-18:00',
            id: 16
          },
          {
            name: 'Tomasz Lewandowski',
            specialization: 'Pediatra',
            workDaysDescription: 'WorkDays: Mon 10:00-17:00, Wen 10:00-19:00',
            id: 21
          }
        ]
      }
    };
  }

  _onAcceptDoctor() {
  }

  _onDoctorChange(value) {
    this.props.onChange('doctor', value);
  }

  render() {
    let { sources, actives } = this.state;
    let { values } = this.props;

    return (
      <Grid>
        <GridItem xsSize="6">
          <DoctorPickerBox
            selectedDoctorId={ values.doctor }
            doctors={ sources.doctors }
            onChange={ this._onDoctorChange.bind(this) }
            onAcceptDoctor={ this._onAcceptDoctor.bind(this) }
            active={ actives.doctorPicker }
          />
        </GridItem>
      </Grid>
    );
  }
}

PatientBookVisit.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func,
};