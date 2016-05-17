import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import {
  Grid,
  GridItem
} from 'ui';

import {
  DoctorPickerBox,
  TermPickerBox,
  VisitDescriptionBox
} from './subcomponents';

import style from './patient_book_visit.scss';

export default class PatientBookVisit extends Component {
  constructor() {
    super();
    this.state = {
      step: 0,
      stepsNumber: {
        doctorPicker: 0,
        datePicker: 1,
        descriptionBox: 2
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

  onNextStep() {
    let { step } = this.state;

    this.setState({
      step: step + 1
    });
  }

  onBackStep() {
    let { step } = this.state;

    this.setState({
      step: step - 1
    });
  }

  _onSignUp() {
    this.props.signUp();
  }

  generateItemClassName(itemStep) {
    let { step } = this.state;

    return classnames(
      style['item-block'],
      { [style['before-hidden-block']]: step < itemStep },
      { [style['show-block']]: step === itemStep },
      { [style['after-hidden-block']]: step > itemStep }
    );
  }

  render() {
    let { sources, stepsNumber } = this.state;
    let { values, onChange } = this.props;

    return (
      <div className={ style['book-visit'] }>
        <Grid
          center
          className={ this.generateItemClassName(stepsNumber.doctorPicker) }
        >
          <GridItem xsSize="6">
            <DoctorPickerBox
              selectedDoctorId={ values.doctor }
              selectedSpecialization={ values.specialization }
              sources={ sources }
              onDoctorChange={ onChange.bind(this, 'doctor') }
              onSpecializationChange={ onChange.bind(this, 'specialization') }
              onNextStep={ this.onNextStep.bind(this) }
            />
          </GridItem>
        </Grid>

        <Grid
          center
          className={ this.generateItemClassName(stepsNumber.datePicker) }
        >
          <GridItem xsSize="6">
            <TermPickerBox
              selectedDate={ values.date }
              onDateChange={ onChange.bind(this, 'date') }
              availableTimes={ sources.time }
              selectedTime={ values.time }
              onTimeChange={ onChange.bind(this, 'time') }
              onNextStep={ this.onNextStep.bind(this) }
              onBackStep={ this.onBackStep.bind(this) }
            />
          </GridItem>
        </Grid>
        <Grid
          center
          className={ this.generateItemClassName(stepsNumber.descriptionBox) }
        >
          <GridItem xsSize="6">
            <VisitDescriptionBox
              visitDescription={ values.description }
              onDescriptionChange={ onChange.bind(this, 'description') }
              onNextStep={ this.onNextStep.bind(this) }
              onBackStep={ this.onBackStep.bind(this) }
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