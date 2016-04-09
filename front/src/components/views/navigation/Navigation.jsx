import React, { Component } from 'react';

import NavigationLinks from '../../../constants/NavigationLinks';

import {
  List, ListItem
} from '../../ui';

export default class Navigation extends Component {

  static contextTypes= {
    router: React.PropTypes.object
  }

  _routeHandler(where) {
    this.context.router.push(where);
  }

  _renderLinks() {
    return NavigationLinks.map((link, index) => {
      return (
        <ListItem
          key={ index }
          caption={ link.label }
          onClick={ this._routeHandler.bind(this, link.path) }
        />
      );
    });
  }

  render() {
    return (
      <div>
        <List>
          { this._renderLinks() }
        </List>
      </div>
    );
  }
}