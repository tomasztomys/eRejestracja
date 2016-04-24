import React, { Component, PropTypes } from 'react';

import {
  Drawer,
} from '../../../../../ui';

import style from './menu_drawer';

export default class MenuDrawer extends Component {

  render() {
    return (
      <Drawer
        className={ style['menu-drawer'] }
        active={ this.props.active }
        type="left"
        onOverlayClick={ this.props.onOverlayClick }
      />
    );
  }
}

MenuDrawer.propTypes = {
  active: PropTypes.bool,
  onOverlayClick: PropTypes.func
};