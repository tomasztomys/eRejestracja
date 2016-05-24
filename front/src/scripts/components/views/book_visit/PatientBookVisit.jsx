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
              onDoctorChange={ onChange.bind(this, 'doctor') }
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
              onChangeDate={ onChange.bind(this, 'selectedDate') }
              doctorId={ values.doctor }
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
              onNextStep={ this._onSignUp.bind(this) }
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