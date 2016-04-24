import React, { Component, PropTypes } from 'react';

import {
  Drawer,
  List,
  ListItem
} from '../../../../../ui';

import style from './menu_drawer';
import AdminNavigationLinks from '../../../../../../constants/AdminNavigationLinks';

export default class MenuDrawer extends Component {

  _renderMenuItem(item) {
    return (
      <List className={ style['main-item'] }>
        <ListItem
          className={ style['menu-item'] }
          key={ item.label }
          caption={ item.label }
          onClick={ () => {} }
        />
      </List>
    );
  }

  _renderSubMenuItem(item) {
    return (
      <ListItem
        className={ style['sub-menu-item'] }
        key={ item.label }
        caption={ item.label }
        onClick={ () => {} }
      />
    );
  }

  _renderSubMenu(item) {
    return (
      <List>
        <ListItem
          className={ style['sub-menu-parent'] }
          key={ item.label }
          caption={ item.label }
          onClick={ () => {} }
        />
        {
          item.children.map((subMenuItem) => {
            return this._renderSubMenuItem(subMenuItem);
          })
        }
      </List>

    );
  }
  _renderNavigationItems(items) {
    return items.map((item) => {
      if (item.children && item.children.length > 0) {
        return this._renderSubMenu(item);
      }

      return this._renderMenuItem(item);
    });
  }

  render() {
    return (
      <Drawer
        className={ style['menu-drawer'] }
        active={ this.props.active }
        type="left"
        onOverlayClick={ this.props.onOverlayClick }
      >
        <div className={ style['menu'] }>
          { this._renderNavigationItems(AdminNavigationLinks) }
        </div>
      </Drawer>
    );
  }
}

MenuDrawer.propTypes = {
  active: PropTypes.bool,
  onOverlayClick: PropTypes.func
};