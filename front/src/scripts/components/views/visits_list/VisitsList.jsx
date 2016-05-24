import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import dateformat from 'dateformat';

import {
  CardWithHeader,
  Table,
  Grid,
  GridItem
} from 'ui';

import * as userReducer from 'reducers/user';
import * as visitsReducer from 'reducers/visits';

import * as Actions from 'actions/Actions';

class VisitsList extends Component {

  constructor() {
    super();
    this.state = {
      model: {
        doctor: { type: String },
        day: { type: String },
        start: { type: String },
        end: { type: String }
      },
      source: [],
      selected: []
    };
  }

  componentDidMount() {
    this.props.dispatch(Actions.getVisitsList(this.props.userId));
  }

  componentWillReceiveProps(nextProps) {
    let source = nextProps.visits.map((item) => {
      return {
        doctor: item.doctorId,
        day: this.generateDateLabel(item.start),
        start: dateformat(item.start, 'HH:MM'),
        end: dateformat(item.end, 'HH:MM')
      };
    });

    this.setState({
      source
    });
  }

  generateDateLabel(date) {
    return dateformat(date, 'dddd, mmmm dS, yyyy');
  }

  onSelect(value) {
    this.setState({
      selected: value
    });
  }

  render() {
    let { model, source, selected } = this.state;

    return (
      <Grid center>
        <GridItem xsSize="6">
          <CardWithHeader
            title={ "Your visits" }
          >
            <Table
              model={ model }
              source={ source }
              onSelect={ this.onSelect.bind(this) }
              selected={ selected }
              selectable={ false }
            />
          </CardWithHeader>
        </GridItem>
      </Grid>
    );
  }
}

VisitsList.propTypes = {
  userId: PropTypes.number,
  visits: PropTypes.array
};

function select(state) {
  state = state.toJS();
  return {
    userId: userReducer.getUserId(state),
    visits: visitsReducer.getVisitsData(state).visits
  };
}

export default connect(select)(VisitsList);