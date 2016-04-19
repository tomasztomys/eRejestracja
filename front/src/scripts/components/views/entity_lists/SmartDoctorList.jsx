import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as Action from '../../../actions/Actions';

import EntityList from './EntityList';

class SmartDoctorList extends Component {
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

  _onRemoveDoctor() {
    let { selected, doctorsList } = this.state;

    for (let index of selected) {
      let id = doctorsList[selected[index]].id;

      this.props.dispatch(Action.deleteDoctor(id));
    }
    this.props.dispatch(Action.fetchDoctorsList());
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
        onRemoveDoctor={ this._handleRemoveDoctor }
        selectable
        buttons={ [
          { label: 'Remove selected doctor', onClick: this._onRemoveDoctor.bind(this) }
        ] }
      />
    );
  }
}

function select(state) {
  state = state.toJS();
  return {
    doctorsList: state.doctorsList
  };
}

export default connect(select)(SmartDoctorList);
