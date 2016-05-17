import React, { PropTypes } from 'react';
import DrawerReactToolbox from 'react-toolbox/lib/drawer';
import classnames from 'classnames';

import style from './drawer.scss';

export default class Drawer extends React.Component {

  render() {
    let { className, ...otherProps } = this.props;
    let drawerStyle = classnames(style['drawer'], className);

    return (
      <DrawerReactToolbox
        className={ drawerStyle }
        { ...otherProps }
      />
    );
  }
}

Drawer.propTypes = {
  className: PropTypes.string,
  active: PropTypes.bool,
  onOverlayClick: PropTypes.func,
  type: PropTypes.oneOf([ 'left', 'right' ])
};
