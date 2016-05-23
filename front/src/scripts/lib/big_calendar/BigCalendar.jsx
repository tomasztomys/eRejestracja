import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';

import BigCalendar from 'react-big-calendar';
import moment from 'moment';

import style from './big_calendar.scss';

export default class BigCalendarWrap extends Component {

  constructor() {
    super();
    BigCalendar.momentLocalizer(moment);
  }

  render() {
    let { className, defaultDate, view, events, min, onSelectEvent } = this.props;
    let bigCalendarStyle = classnames(style['big-calendar'], className);
    return (
      <div className={ bigCalendarStyle }>
        <BigCalendar
          defaultDate={ defaultDate }
          events={ events }
          min={ min }
          onSelectEvent={ onSelectEvent }
          selectable
        />
      </div>
    );
  }
}

BigCalendarWrap.propTypes = {
  className: PropTypes.string,
  defaultDate: PropTypes.object,
  events: PropTypes.array
};