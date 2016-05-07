import React, { Component, PropTypes } from 'react';

import {
  Card,
  Dropdown
} from '../../../../ui';

export default class BookVisitBox extends Component {
  constructor() {
    super();
    this.state = {
      labels: {
        doctor: 'Choose a doctor you want to visit.',
        doctorDescription: 'This doctor takes on Monday and Thursday'
      },
      errors: {
        doctor: '',
      },
      errorsMessages: {
        doctor: 'Please choose doctor.',
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

  _onAccept() {
    this.props.onAcceptDoctor();
  }

  render() {
    let { labels, errors } = this.state;
    let { selectedDoctorId, onChange, doctors, active } = this.props;

    let actions = [
      {
        label: 'Accept',
        onClick: this._onAccept.bind(this)
      }
    ];

    return (
      <Card
        subtitle="You can select doctor and book a visit on select term."
        title="Book visit to doctor."
        actions={ actions }
      >
        <Dropdown
          source={ this._onPrepareDoctors(doctors) }
          label={ labels.doctor }
          value={ selectedDoctorId }
          error={ errors.doctor }
          onChange={ onChange.bind(this) }
          disabled={ !active }
        />
      </Card>
    );
  }
}

BookVisitBox.propTypes = {
  selectedDoctorId: PropTypes.number,
  doctors: PropTypes.array,
  onChange: PropTypes.func,
  onAcceptDoctor: PropTypes.func,
  active: PropTypes.bool
};