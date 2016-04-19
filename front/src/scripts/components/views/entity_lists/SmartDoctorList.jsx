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
        heading={ true }
        selectable
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
