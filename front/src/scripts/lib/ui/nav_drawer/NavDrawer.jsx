import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';

import { NavDrawer as NavDrawerReactToolbox } from 'react-toolbox';

import style from './nav_drawer.scss';

export default class AppBar extends Component {
  render() {
    let { className, active, onOverlayClick, children, ...otherProps } = this.props;
    let NavDrawerStyle = classnames(style['nav-drawer'], className);

    return (
      <NavDrawerReactToolbox
        className={ NavDrawerStyle }
        active={ active }
        pinned={ false }
        permanentAt="xxxl"
        onOverlayClick={ onOverlayClick }
        { ...otherProps }
      >
        { children }
      </NavDrawerReactToolbox>
    );
  }
}

AppBar.propTypes = {
  className: PropTypes.string,
  active: PropTypes.bool,
  onOverlayClick: PropTypes.func,
  children: PropTypes.any
};