import React, { PropTypes } from 'react';
import classnames from 'classnames';

import { Panel, Layout, IconButton } from 'react-toolbox';
import { NavDrawer, AppBar } from 'ui';

export default class MainLayout extends React.Component {
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
    let { drawerActive } = this.state;

    return (
      <Layout>
        <NavDrawer active={ drawerActive }
          pinned={ false }
          permanentAt="xxxl"
          onOverlayClick={ this.toggleDrawerActive.bind(this) }
        >
          <p>
              Navigation, account switcher, etc. go here.
          </p>
        </NavDrawer>
        <Panel>
          <AppBar>
            <IconButton
              icon={ drawerActive ? "close" : "menu"}
              inverse
              onClick={ this.toggleDrawerActive.bind(this) }
            />
          </AppBar>
          <div style={ { flex: 1, overflowY: 'auto', padding: '1.8rem' } }>
            { this.props.chidlren }
          </div>
        </Panel>
      </Layout>
    );
  }
}