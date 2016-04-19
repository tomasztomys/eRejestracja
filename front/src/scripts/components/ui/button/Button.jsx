import React, { PropTypes } from 'react';
import ButtonReactToolbox from 'react-toolbox/lib/button';

export default class Button extends React.Component {
  render() {
    let { label, className, ...otherProps } = this.props;

    return (
      <ButtonReactToolbox
        className={ className }
        label={ label }
        ripple={ false }
        { ...otherProps }
        raised
        primary
      />
    );
  }
}

Button.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func
};
