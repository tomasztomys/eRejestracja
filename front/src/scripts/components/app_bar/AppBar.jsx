import React, { PropTypes } from 'react';
import classnames from 'classnames';

import { Checkbox, IconButton } from 'react-toolbox';
import { Layout, NavDrawer, Panel, Sidebar } from 'react-toolbox';
import { AppBar as ReactAppBar } from 'react-toolbox';

export default class AppBar extends React.Component {
  constructor() {
    super();

    this.state = {
      drawerActive: false,
    };
  }

  toggleDrawerActive() {
    this.setState({
      drawerActive: !this.state.drawerActive
    });
  }

  render() {
    let { className, disabled, sizeType, type, ...otherProps } = this.props;

    return (
      <Layout>
        <NavDrawer active={ this.state.drawerActive }
          pinned={ false }
          permanentAt="xxxl"
          onOverlayClick={ this.toggleDrawerActive.bind(this) }
        >
          <p>
              Navigation, account switcher, etc. go here.
          </p>
        </NavDrawer>
        <Panel>
          <ReactAppBar>
            <IconButton
              icon="menu"
              inverse
              onClick={ this.toggleDrawerActive.bind(this) }
            />
          </ReactAppBar>
          <div style={ { flex: 1, overflowY: 'auto', padding: '1.8rem' } }>
            { this.props.chidlren }
          </div>
        </Panel>
      </Layout>
    );
  }
}