import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
  CardWithHeader,
  Dropdown
} from 'ui';

import {
  PickerBox
} from '../';

import * as doctorsReducer from 'reducers/doctors';
import * as Actions from 'actions/Actions';

class BookVisitBox extends Component {
  constructor() {
    super();
    this.state = {
      doctors: [],
      specializations: [],
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

  componentDidMount() {
    this.props.dispatch(Actions.fetchDoctorsList());
  }

  componentWillReceiveProps(nextProps) {
    let { doctors } = nextProps;

    this.setState({
      doctors: this._onPrepareDoctors(doctors),
      specializations: this.getUniqueSpecializations(doctors)
    });
  }

  getUniqueSpecializations(doctors) {
    let specializationsSource = [];
    let specializations = [];

    for (let doctor of doctors) {
      let specialization = doctor.specialization;

      if (specializations.indexOf(specialization) === -1) {
        specializations.push(specialization);
        specializationsSource.push({
          label: specialization,
          value: specialization
        });
      }
    }

    return specializationsSource;
  }

  _onPrepareDoctors(doctors) {
    return doctors.map((doctor) => {
      return {
        value: doctor.id,
        label: `${ doctor.name } ${ doctor.surname }`,
        specialization: doctor.specialization
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

  onNextStep() {
    let { selectedDoctorId, selectedSpecialization } = this.props;

    if (selectedSpecialization.length === 0) {
      this.setError('specialization');
    }
    else if (selectedDoctorId === 0) {
      this.setError('doctor');
    }
    else {
      this.props.onNextStep();
    }
  }

  filterDoctors(doctors, specialization) {
    return doctors.filter((doctor) => {
      return (doctor.specialization === specialization);
    });
  }

  render() {
    let { labels, errors, doctors, specializations } = this.state;
    let {
      sources,
      selectedDoctorId,
      selectedSpecialization,
      onDoctorChange,
      onSpecializationChange,
      onNextStep,
      onBackStep
    } = this.props;
    return (
      <PickerBox
        title="Book visit to doctor."
        subtitle="You can select doctor and book a visit on select term."
        onNextStep={ this.onNextStep.bind(this) }
        onBackStep={ onBackStep }
      >
        <Dropdown
          source={ specializations }
          label={ labels.specialization }
          value={ selectedSpecialization }
          error={ errors.specialization }
          onChange={ onSpecializationChange.bind(this) }
        />
        <Dropdown
          source={ this.filterDoctors(doctors, selectedSpecialization) }
          label={ labels.doctor }
          value={ selectedDoctorId }
          error={ errors.doctor }
          onChange={ onDoctorChange.bind(this) }
          disabled={ selectedSpecialization.length === 0 }
        />
      </PickerBox>
    );
  }
}

BookVisitBox.propTypes = {
  sources: PropTypes.object,
  selectedDoctorId: PropTypes.number,
  doctors: PropTypes.array,
  selectedSpecialization: PropTypes.string,
  onDoctorChange: PropTypes.func,
  onSpecializationChange: PropTypes.func,
  onNextStep: PropTypes.func,
  onBackStep: PropTypes.func
};

function select(state) {
  state = state.toJS();
  return {
    doctors: doctorsReducer.getDoctorsList(state)
  };
}

export default connect(select)(BookVisitBox);