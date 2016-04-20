import React, { PropTypes } from 'react';
import ButtonReactToolbox from 'react-toolbox/lib/button';
import classnames from 'classnames';

import style from './button.scss';

export default class Button extends React.Component {

  render() {
    let { className, sizeType, ...otherProps } = this.props;
    let buttonStyle = classnames(style['rt-button'], sizeType, className);

    return (
      <ButtonReactToolbox
        className={ buttonStyle }
        { ...otherProps }
        ripple
        raised
        primary
      />
    );
  }
}

Button.propTypes = {
  icon: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  sizeType: PropTypes.oneOf([ 'large', 'default', 'small', 'extra-small' ]),
  onClick: PropTypes.func
};
