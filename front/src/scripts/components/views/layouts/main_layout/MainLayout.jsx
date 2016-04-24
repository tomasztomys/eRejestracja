import React, { Component, PropTypes } from 'react';

import {
  Button
} from '../../../ui';

import style from './style/main_layout';

import { MenuDrawer } from './subcomponents';

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
    return (
      <div className={ style['root'] }>
        <header className={ style['header'] }>
          <div className={ style['user-name'] }>Dariusz Paluch</div>
          <Button
            className={ style['hamburger'] }
            label="Show menu"
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