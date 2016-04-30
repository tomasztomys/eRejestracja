import React, { Component, PropTypes } from 'react';

import {
  Button,
  Avatar,
  FontIcon
} from '../../../ui';

import style from './style/main_layout';

import { MenuDrawer } from './subcomponents';

import doctorAvatar from '../../../../../../assets/doctor.jpg';

export default class MainLayout extends Component {
  constructor() {
    super();
    this.state = {
      drawerMenuActive: false
    };
  }

  _toggleDrawerMenu() {
    let drawerMenuActive = this.state.drawerMenuActive;

    this.setState({
      drawerMenuActive: !drawerMenuActive
    });
  }

  render() {
    let { drawerMenuActive } = this.state;

    return (
      <div className={ style['root'] }>
        <header className={ style['header'] }>
          <div className={ style['user-name'] }>Dariusz Paluch</div>
          <div className={ style['avatar-content'] }>
            <Avatar
              className={ style['avatar'] }
              title="Doctor avatar"
              image={ doctorAvatar }
            />
          </div>
          <Button
            className={ style['menu'] }
            icon={ drawerMenuActive ? 'close' : 'menu' }
            onClick={ this._toggleDrawerMenu.bind(this) }
          />
        </header>
        <MenuDrawer
          active={ this.state.drawerMenuActive }
          onOverlayClick={ this._toggleDrawerMenu.bind(this) }
        />
        <div className={ style['body'] }>
          { this.props.children }
        </div>
      </div>
    );
  }
}

MainLayout.propTypes = {
  children: PropTypes.node
};