import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as Action from '../../../../actions/Actions';

import EntityList from '../EntityList';

class SmartDoctorsList extends Component {
  constructor() {
    super();

    this.state = {
      doctorsModel: {},
      doctorsList: [],
      selected: []
    };
  }

  componentDidMount() {
    this.props.dispatch(Action.fetchDoctorsList());

    this.state = {
      doctorsModel: {
        id: { type: Number },
        name: { type: String },
        surname: { type: String },
        email: { type: String },
        pesel: { type: String },
        specialization: String
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    let { doctorsList } = nextProps;

    this.setState({
      doctorsList
    });
  }

  _handleSelect(selected) {
    this.setState({
      selected
    });
  }

  _onRemove() {
    let { selected, doctorsList } = this.state;

    selected = selected || [];
    selected.forEach((doctor) => {
      let id = doctorsList[doctor].id;

      this.props.dispatch(Action.deleteDoctor(id));
    });

    this._handleSelect([]);
  }

  render() {
    let {
      doctorsModel,
      doctorsList,
      selected
    } = this.state;

    return (
      <EntityList
        title="DOCTORS LIST"
        model={ doctorsModel }
        source={ doctorsList }
        onSelect={ this._handleSelect.bind(this) }
        selected={ selected }
        onRemove={ this._handleRemoveDoctor }
        selectable
        buttons={ [
          { label: 'Remove selected doctor', onClick: this._onRemove.bind(this) }
        ] }
        noDataMessage="No Doctors in database"
      />
    );
  }
}

function select(state) {
  state = state.toJS();
  return {
    doctorsList: state.doctors
  };
}

export default connect(select)(SmartDoctorsList);
