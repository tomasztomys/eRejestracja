import React, { PropTypes, Component } from 'react';

import BigCalendar from 'react-big-calendar';
import moment from 'moment';

import style from './big_calendar.scss';

export default class BigCalendarWrap extends Component {

  constructor() {
    super();
    BigCalendar.momentLocalizer(moment);
  }

  render() {
    return (
      <div className={ style['big-calendar'] }>
        <BigCalendar
          defaultDate={ new Date(2015, 3, 1) }
          events={ [] }
        />
      </div>
    );
  }
}

BigCalendarWrap.propTypes = {
};