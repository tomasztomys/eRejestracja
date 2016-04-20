import React, { PropTypes } from 'react';
import InputReactToolbox from 'react-toolbox/lib/input';
import classnames from 'classnames';

import style from './input.scss';

export default class Input extends React.Component {

  render() {
    let {
      className,
      error,
      ...otherProps
    } = this.props;

    let inputStyle = classnames(
      style['input'],
      { [style['error']]: error && error.length > 0 },
      className
    );

    return (
      <InputReactToolbox
        className={ inputStyle }
        error={ error }
        type="text"
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
