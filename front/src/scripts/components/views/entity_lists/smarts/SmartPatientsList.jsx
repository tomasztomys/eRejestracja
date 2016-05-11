import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as Action from '../../../../actions/Actions';

import EntityList from '../EntityList';

class SmartPatientsList extends Component {
  constructor() {
    super();

    this.state = {
      patientsModel: {},
      patientsList: [],
      selected: []
    };
  }

  componentDidMount() {
    this.props.dispatch(Action.fetchPatientsList());

    this.state = {
      patientsModel: {
        id: { type: Number },
        name: { type: String },
        surname: { type: String },
        email: { type: String },
        pesel: { type: String }
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    let { patientsList } = nextProps;

    this.setState({
      patientsList
    });
  }

  _handleSelect(selected) {
    this.setState({
      selected
    });
  }

  _onRemove() {
    let { selected, patientsList } = this.state;

    selected = selected || [];
    selected.forEach((patient) => {
      let id = patientsList[patient].id;

      this.props.dispatch(Action.deletePatient(id));
    });

    this._handleSelect([]);
  }

  render() {
    let {
      patientsModel,
      patientsList,
      selected
    } = this.state;

    return (
      <EntityList
        title="PATIENTS LIST"
        model={ patientsModel }
        source={ patientsList }
        onSelect={ this._handleSelect.bind(this) }
        selected={ selected }
        selectable
        buttons={ [
          { label: 'Remove selected patient', onClick: this._onRemove.bind(this) }
        ] }
        noDataMessage="No patients in database"
      />
    );
  }
}

function select(state) {
  state = state.toJS();
  return {
    patientsList: state.patients
  };
}

export default connect(select)(SmartPatientsList);
