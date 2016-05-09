import React, { Component, PropTypes } from 'react';

import {
  CardWithHeader,
  Dropdown
} from '../../../../ui';

export default class BookVisitBox extends Component {
  constructor() {
    super();
    this.state = {
      labels: {
        specialization: 'Choose doctor type',
        doctor: 'Choose a doctor you want to visit.',
        doctorDescription: 'This doctor takes on Monday and Thursday'
      },
      errors: {
        doctor: '',
        specialization: ''
      },
      errorsMessages: {
        doctor: 'Please choose doctor.',
        specialization: 'Please choose specialization.'
      }
    };
  }

  _onPrepareDoctors(doctors) {
    return doctors.map((doctor) => {
      return {
        value: doctor.id,
        label: `${ doctor.name } - ${ doctor.specialization }`
      };
    });
  }

  _onPrepareSpecializations(specializations) {
    return specializations.map((specialization) => {
      return {
        value: specialization.value,
        label: specialization.name
      };
    });
  }

  setError(key) {
    let { errors, errorsMessages } = this.state;

    errors[key] = errorsMessages[key];
    this.setState({
      errors
    });
  }

  _onAccept() {
    let { selectedDoctorId, selectedSpecialization } = this.props;

    if (selectedSpecialization.length === 0) {
      this.setError('specialization');
    }
    else if (selectedDoctorId === 0) {
      this.setError('doctor');
    }
    else {
      this.props.onAccept();
    }
  }

  render() {
    let { labels, errors } = this.state;
    let {
      sources,
      selectedDoctorId,
      selectedSpecialization,
      onDoctorChange,
      onSpecializationChange,
      disabled
    } = this.props;

    let actions = [
      {
        label: 'Accept',
        onClick: this._onAccept.bind(this),
        disabled: disabled
      }
    ];

    return (
      <CardWithHeader
        title="Book visit to doctor."
        subtitle="You can select doctor and book a visit on select term."
        actions={ actions }
      >
        <Dropdown
          source={ this._onPrepareSpecializations(sources.specializations) }
          label={ labels.specialization }
          value={ selectedSpecialization }
          error={ errors.specialization }
          onChange={ onSpecializationChange.bind(this) }
          disabled={ disabled }
        />
        <Dropdown
          source={ this._onPrepareDoctors(sources.doctors) }
          label={ labels.doctor }
          value={ selectedDoctorId }
          error={ errors.doctor }
          onChange={ onDoctorChange.bind(this) }
          disabled={ disabled || selectedSpecialization.length === 0 }
        />
      </CardWithHeader>
    );
  }
}

BookVisitBox.propTypes = {
  sources: PropTypes.object,
  selectedDoctorId: PropTypes.number,
  doctors: PropTypes.array,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onAccept: PropTypes.func,
  selectedSpecialization: PropTypes.string,
  onDoctorChange: PropTypes.func,
  onSpecializationChange: PropTypes.func
};