import React, { PropTypes } from 'react';
import CheckboxReactToolbox from 'react-toolbox/lib/checkbox';
import classnames from 'classnames';

import style from './checkbox.scss';

export default class Checkbox extends React.Component {

  render() {
    let { className, checked, ...otherProps } = this.props;
    let checkboxStyle = classnames(
      style['checkbox'],
     className
   );

    return (
      <CheckboxReactToolbox
        className={ checkboxStyle }
        checked={ checked }
        { ...otherProps }
        ripple
      />
    );
  }
}

Checkbox.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool
};
