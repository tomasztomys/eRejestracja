import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import dateformat from 'dateformat';

import {
  CardWithHeader,
  Table
} from 'ui';

import * as userReducer from 'reducers/user';
import * as doctorsReducer from 'reducers/doctors';
import * as workHoursReducer from 'reducers/work_hours';

import * as Actions from 'actions/Actions';

class WorkHoursTable extends Component {

  constructor() {
    super();
    this.state = {
      model: {
        day: { type: String },
        from: { type: String },
        to: { type: String }
      },
      source: [],
      selected: [],
      downloadedWorkHours: false
    };
  }

  componentDidMount() {
    this.getWorkHours(this.props.userId);
  }

  componentWillReceiveProps(nextProps) {
    this.getWorkHours(nextProps.userId);

    let source = nextProps.workHours.map((item) => {
      return {
        id: item.id,
        day: this.generateDateLabel(item.from),
        from: dateformat(item.from, 'HH:MM'),
        to: dateformat(item.to, 'HH:MM')
      };
    });

    this.setState({
      source
    });
  }

  getWorkHours(userId) {
    let { downloadedWorkHours } = this.state;

    if (Number.isInteger(userId) && !downloadedWorkHours) {
      this.props.dispatch(Actions.getWorkHours(userId));
      this.setState({
        downloadedWorkHours: true
      });
    }
  }

  generateDateLabel(date) {
    return dateformat(date, 'dddd, mmmm dS, yyyy');
  }

  onSelect(value) {
    this.setState({
      selected: value
    });
  }

  onEditItem(id) {
    console.log(id);
  }

  onDeleteItem(id) {
    console.log(id);
  }

  render() {
    let { model, source, selected } = this.state;

    return (
      <CardWithHeader
        title={ "Your work hours" }
      >
        <Table
          model={ model }
          source={ source }
          onSelect={ this.onSelect.bind(this) }
          selected={ selected }
          selectable={ false }
          onEditItem={ this.onEditItem.bind(this) }
          onDeleteItem={ this.onDeleteItem.bind(this) }
        />
      </CardWithHeader>

    );
  }
}

WorkHoursTable.propTypes = {
  userId: PropTypes.number
};

function select(state) {
  state = state.toJS();
  return {
    userId: userReducer.getUserId(state),
    workHours: workHoursReducer.getUserWorkHours(state)
  };
}

export default connect(select)(WorkHoursTable);