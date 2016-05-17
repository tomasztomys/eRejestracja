import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as Action from '../../../../actions/Actions';
import * as patientsReducer from '../../../../reducers/patients';

import EntityList from '../EntityList';

class SmartPatientsList extends Component {
  constructor() {
    super();

    this.state = {
      patientsModel: {
        name: { type: String },
        surname: { type: String },
        email: { type: String },
        pesel: { type: String }
      },
      selected: []
    };
  }

  componentDidMount() {
    this.props.dispatch(Action.fetchPatientsList());
  }

  _handleSelect(selected) {
    this.setState({
      selected
    });
  }

  _cleanSelected() {
    this.setState({
      selected: []
    });
  }

  _onRemove() {
    let { selected } = this.state;
    let { patientsList } = this.props;
    let ids = [];

    selected.forEach((index) => {
      ids.push(patientsList[index].id);
    });

    this.props.dispatch(Action.deletePatients(ids));
    this._cleanSelected();
  }

  onDeleteItem(id) {
    this.props.dispatch(Action.deletePatients([ id ]));
  }

  render() {
    let {
      patientsModel,
      selected
    } = this.state;

    let { patientsList } = this.props;

    return (
      <EntityList
        title="PATIENTS LIST"
        subtitle="You can remove patient or edit."
        model={ patientsModel }
        source={ patientsList }
        onSelect={ this._handleSelect.bind(this) }
        selected={ selected }
        selectable
        buttons={ [
          { label: 'Remove selected patients', onClick: this._onRemove.bind(this) }
        ] }
        onDeleteItem={ this.onDeleteItem.bind(this) }
        noDataMessage="No patients in database"
      />
    );
  }
}

SmartPatientsList.propTypes = {
  patientsList: PropTypes.array
};

SmartPatientsList.defaultProps = {
  patientsList: []
};

function select(state) {
  state = state.toJS();
  return {
    patientsList: patientsReducer.getPatientsList(state)
  };
}

export default connect(select)(SmartPatientsList);
