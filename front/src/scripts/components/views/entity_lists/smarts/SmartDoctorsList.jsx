import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as Action from '../../../../actions/Actions';
import * as doctorsReducer from '../../../../reducers/doctors';

import EntityList from '../EntityList';

class SmartDoctorsList extends Component {
  constructor() {
    super();

    this.state = {
      doctorsModel: {
        id: { type: Number },
        name: { type: String },
        surname: { type: String },
        email: { type: String },
        pesel: { type: String }
      },
      selected: []
    };
  }

  componentDidMount() {
    this.props.dispatch(Action.fetchDoctorsList());
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
    let { doctorsList } = this.props;
    let ids = [];

    selected.forEach((index) => {
      ids.push(doctorsList[index].id);
    });

    this.props.dispatch(Action.deleteDoctors(ids));
    this._cleanSelected();
  }

  render() {
    let {
      doctorsModel,
      selected
    } = this.state;

    let { doctorsList } = this.props;

    return (
      <EntityList
        title="DOCTORS LIST"
        model={ doctorsModel }
        source={ doctorsList }
        onSelect={ this._handleSelect.bind(this) }
        selected={ selected }
        selectable
        buttons={ [
          { label: 'Remove selected doctors', onClick: this._onRemove.bind(this) }
        ] }
        noDataMessage="No doctors in database"
      />
    );
  }
}

SmartDoctorsList.propTypes = {
  doctorsList: PropTypes.array
};

SmartDoctorsList.defaultProps = {
  doctorsList: []
};

function select(state) {
  state = state.toJS();
  return {
    doctorsList: doctorsReducer.getDoctorsList(state)
  };
}

export default connect(select)(SmartDoctorsList);
