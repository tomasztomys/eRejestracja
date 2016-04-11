import React, { PropTypes } from 'react';
import InputReactToolbox from 'react-toolbox/lib/input';
import classnames from 'classnames';

import style from './input.scss';

export default class Input extends React.Component {

  render() {
    let {
      label,
      error,
      icon,
      className,
      value,
      onChange,
      ...otherProps
    } = this.props;

    let inputStyle = classnames(style['input'], className);

    return (
      <InputReactToolbox
        className={ inputStyle }
        label={ label }
        value={ value }
        onChange={ onChange }
        error={ error }
        type="text"
        icon={ icon }
        floating
        {...otherProps}
      />
    );
  }
}

Input.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  icon: PropTypes.string
};
