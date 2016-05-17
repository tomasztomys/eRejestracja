import React, { PropTypes } from 'react';
import FontIconReactToolbox from 'react-toolbox/lib/font_icon';
import classnames from 'classnames';

import style from './font_icon.scss';

export default class FontIcon extends React.Component {

  render() {
    let { className, ...otherProps } = this.props;
    let fontIconStyle = classnames(style['font-icon'], className);

    return (
      <FontIconReactToolbox
        className={ fontIconStyle }
        { ...otherProps }
      />
    );
  }
}

FontIcon.propTypes = {
  className: PropTypes.string,
  value: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element
  ]),
};
