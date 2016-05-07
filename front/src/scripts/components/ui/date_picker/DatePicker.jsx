import React, { PropTypes, Component } from 'react';
import DatePickerReactToolbox from 'react-toolbox/lib/date_picker';
import classnames from 'classnames';

import style from './date_picker.scss';

export default class DatePicker extends Component {

  render() {
    let { className, ...otherProps } = this.props;
    let DatePickerStyle = classnames(style['rt-date-picker'], className);

    return (
      <DatePickerReactToolbox
        className={ DatePickerStyle }
        { ...otherProps }
      />
    );
  }
}

DatePicker.propTypes = {
  className: PropTypes.string,
};
