import React, { PropTypes, Component } from 'react';
import DatePickerReactToolbox from 'react-toolbox/lib/date_picker';
import classnames from 'classnames';

import style from './date_picker.scss';
import { Dropdown } from '../dropdown';

export default class DatePicker extends Component {

  render() {
    let { className, disabled, label, ...otherProps } = this.props;
    let datePickerStyle = classnames(style['rt-date-picker'], className);

    return (
      <div>
        { disabled ?
          <Dropdown
            label={ label }
            source={ [] }
            disabled
          /> :
          <DatePickerReactToolbox
            className={ datePickerStyle }
            label={ label }
            { ...otherProps }
          />
        }
      </div>
    );
  }
}

DatePicker.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string
};
