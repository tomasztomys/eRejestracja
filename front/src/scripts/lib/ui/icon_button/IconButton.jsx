import React, { PropTypes } from 'react';
import { IconButton as IconButtonReactToolbox } from 'react-toolbox';
import classnames from 'classnames';

import style from './icon_button.scss';

export default class IconButton extends React.Component {

  render() {
    let { className, icon, key, onClick, ...otherProps } = this.props;
    let iconButtonStyle = classnames(style['icon-button'], className);

    return (
      <IconButtonReactToolbox
        className={ iconButtonStyle }
        icon={ icon }
        key={ key }
        onClick={ onClick }
        { ...otherProps }
      />
    );
  }
}

IconButton.propTypes = {
  icon: PropTypes.string,
  key: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func
};
