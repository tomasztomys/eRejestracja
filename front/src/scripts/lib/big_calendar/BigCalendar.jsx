import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';

import BigCalendar from 'react-big-calendar';
import moment from 'moment';

import style from './big_calendar.scss';

export default class BigCalendarWrap extends Component {

  constructor() {
    super();
    BigCalendar.momentLocalizer(moment);
    this.state = {
      view: 'month'
    };
  }

  componentDidMount() {
    this.setState({
      view: this.props.defaultView || 'month'
    });
  }

  onViewChange(view) {
    this.setState({
      view
    });
  }

  render() {
    let { view } = this.state;
    let { className, defaultDate, events, min, onSelectEvent } = this.props;
    let bigCalendarStyle = classnames(style['big-calendar'], className);
    return (
      <div className={ bigCalendarStyle }>
        <BigCalendar
          defaultDate={ defaultDate }
          events={ events }
          min={ min }
          view={ view }
          onView={ this.onViewChange.bind(this) }
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
  events: PropTypes.array,
  defaultView: PropTypes.oneOf([ 'month', 'week', 'day', 'agenda' ])
};