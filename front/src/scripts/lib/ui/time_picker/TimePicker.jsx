import React, { PropTypes, Component } from 'react';
import TimePickerReactToolbox from 'react-toolbox/lib/time_picker';
import classnames from 'classnames';

import style from './time_picker.scss';

export default class TimePicker extends Component {

  render() {
    let { className, label, onChange, value, ...otherProps } = this.props;
    let timePickerStyle = classnames(style['time-picker'], className);

    return (
      <TimePickerReactToolbox
        className={ timePickerStyle }
        label={ label }
        onChange={ onChange }
        value={ value }
        { ...otherProps }
      />
    );
  }
}

TimePicker.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.any
};
