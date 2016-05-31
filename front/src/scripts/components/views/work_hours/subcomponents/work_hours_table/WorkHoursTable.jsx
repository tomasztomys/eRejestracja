import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import dateformat from 'dateformat';

import {
  CardWithHeader,
  Table
} from 'lib/ui';

import {
  BigCalendar
} from 'lib/big_calendar';
import moment from 'moment';

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
        start: { type: String },
        end: { type: String }
      },
      source: [],
      tableSource: [],
      selected: [],
      downloadedWorkHours: false
    };
  }

  componentDidMount() {
    this.getWorkHours(this.props.userId);
  }

  componentWillReceiveProps(nextProps) {
    this.getWorkHours(nextProps.userId);

    let source = this.prepareEvents(nextProps.workHours.terms);

    this.setState({
      source
    });
  }

  getWorkHours(userId) {
    let { downloadedWorkHours } = this.state;

    if (Number.isInteger(userId) && userId > 0 && !downloadedWorkHours) {
      this.props.dispatch(Actions.getWorkHours(userId));
      this.setState({
        downloadedWorkHours: true
      });
    }
  }

  generateDateLabel(date) {
    return dateformat(date, 'dddd, mmmm dS, yyyy');
  }

  // onSelect(value) {

  //   this.setState({
  //     selected: value
  //   });
  // }

  onEditItem(id) {
  }

  onDeleteItem(id) {
    this.props.dispatch(Actions.deleteWorkHours(this.props.userId, id));
    this.setState({
      tableSource: []
    });
  }

  prepareEvents(source) {
    return source.map((item, index) => {
      return {
        index: index,
        id: item.id,
        title: 'WORK',
        start: item.start,
        end: item.end
      };
    });
  }

  onSelectEvent(event) {
    let source = this.state.source;

    source[event.index].selected = true;
    this.setState({
      source,
      tableSource: [
        {
          id: event.id,
          day: this.generateDateLabel(event.start),
          start: dateformat(event.start, 'HH:MM'),
          end: dateformat(event.end, 'HH:MM')
        }
      ]
    });
  }

  render() {
    let { model, source, tableSource, selected } = this.state;
    let minHours = new Date();

    minHours.setHours(7);
    minHours.setMinutes(0);

    return (
      <CardWithHeader
        title={ "Your work hours" }
      >
        <BigCalendar
          defaultDate={ new Date() }
          events={ source }
          min={ minHours }
          onSelectEvent={ this.onSelectEvent.bind(this) }
          defaultView="month"
        />
        {
          tableSource > 0 ?
            <Table
              model={ model }
              source={ tableSource }
              selected={ selected }
              selectable={ false }
              onDeleteItem={ this.onDeleteItem.bind(this) }
            /> : null
        }
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