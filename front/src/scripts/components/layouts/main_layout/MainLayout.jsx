import React, { PropTypes } from 'react';
import classnames from 'classnames';
import SVG from 'svg-inline-react';

import { Panel, Layout } from 'react-toolbox';

import { MenuDrawer, AppBarContent } from './subcomponents';

import Gravatar from 'react-gravatar';

import style from './style/main_layout';

import logo from 'assets/logo.svg';
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
    let { children, user, userType } = this.props;
    let appBarLabel = `${ user.name } ${ user.surname }`;

    return (
      <Layout
        className={ style['root'] }
      >
        <MenuDrawer
          className={ style['nav-drawer'] }
          active={ drawerActive }
          onOverlayClick={ this.toggleDrawerActive.bind(this) }
          userType={ userType }
        />
        <Panel>
          <AppBarContent
            drawerActive={ drawerActive }
            user={ user }
            toggleDrawerActive={ this.toggleDrawerActive }
          />
          <div className={ style['body'] }>
            { children }
          </div>
        </Panel>
      </Layout>
    );
  }
}

MainLayout.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
  surname: PropTypes.string,
  userType: PropTypes.oneOf([ 'admin', 'patient', 'doctor' ])
};