import React, { Component, PropTypes } from 'react';

import {
  Drawer,
  List,
  ListItem,
  FontIcon
} from '../../../../../ui';

import classnames from 'classnames';

import style from './menu_drawer';
import AdminNavigationLinks from '../../../../../../constants/AdminNavigationLinks';

export default class MenuDrawer extends Component {
  constructor() {
    super();
    let menuItems = AdminNavigationLinks.map((menuItem, index) => {
      let item = menuItem;

      item.open = false;
      item.id = index;
      return item;
    });

    this.state = {
      menuItems,
      activeItemId: -1
    };
  }

  _routeHandler(item) {
    this.context.router.push(item.path);
    this.props.onOverlayClick();
    this.setState({
      activeItemId: item.id
    });
  }

  _renderMenuItem(item) {
    return (
      <List key={ item.label }>
        <ListItem
          className={
            classnames(
              style['main-item'],
            )
          }
          key={ item.label }
          caption={ item.label }
          onClick={ this._routeHandler.bind(this, item) }
        />
      </List>
    );
  }

  _renderSubMenuItem(item) {
    return (
      <ListItem
        className={
          classnames(
            style['sub-menu-item'],
          )
        }
        key={ item.label }
        caption={ item.label }
        onClick={ this._routeHandler.bind(this, item) }
      />
    );
  }

  _toggleMenu(id) {
    let { menuItems } = this.state;

    menuItems[id].open = !menuItems[id].open;
    this.setState({
      menuItems
    });
  }

  _renderSubMenu(item) {
    let icon = item.open ? 'keyboard_arrow_up' : 'keyboard_arrow_down';

    return (
      <List key={ item.label }>
        <ListItem
          className={
            classnames(style['sub-menu-parent'],
            { [style['open']]: item.open })
          }
          key={ item.label }
          caption={ item.label }
          onClick={ this._toggleMenu.bind(this, item.id) }
          rightIcon={
            <FontIcon
              className={ style['right-icon'] }
              value={ icon }
            />
          }
        />
        {
          item.open ?
          item.children.map((subMenuItem) => {
            return this._renderSubMenuItem(subMenuItem);
          }) : null
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
          { this._renderNavigationItems(this.state.menuItems) }
        </div>
      </Drawer>
    );
  }
}

MenuDrawer.contextTypes = {
  router: React.PropTypes.object
};

MenuDrawer.propTypes = {
  active: PropTypes.bool,
  onOverlayClick: PropTypes.func
};