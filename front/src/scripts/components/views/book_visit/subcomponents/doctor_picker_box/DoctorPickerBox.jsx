import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
  Dropdown
} from 'ui';

import {
  PickerBox
} from '../';

import * as doctorsReducer from 'reducers/doctors';
import * as Actions from 'actions/Actions';

import { capitalizeFirstLetter } from 'utilities';

class BookVisitBox extends Component {
  constructor() {
    super();

    this.state = {
      doctors: [],
      specializations: [],
      selectedSpecialization: '',
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
          label: capitalizeFirstLetter(specialization),
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
    let { selectedDoctorId } = this.props;
    let { selectedSpecialization } = this.state;

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

  onSpecializationChange(value) {
    this.setState({
      selectedSpecialization: value
    });
  }

  render() {
    let {
      labels,
      errors,
      doctors,
      specializations,
      selectedSpecialization
    } = this.state;

    let {
      selectedDoctorId,
      onDoctorChange,
      onBackStep
    } = this.props;

    return (
      <PickerBox
        title="Book visit to doctor."
        subtitle="You can select specialization, then select doctor."
        onNextStep={ this.onNextStep.bind(this) }
        onBackStep={ onBackStep }
      >
        <Dropdown
          source={ specializations }
          label={ labels.specialization }
          value={ selectedSpecialization }
          error={ errors.specialization }
          onChange={ this.onSpecializationChange.bind(this) }
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
  doctors: PropTypes.array,
  selectedDoctorId: PropTypes.number,
  onDoctorChange: PropTypes.func,
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