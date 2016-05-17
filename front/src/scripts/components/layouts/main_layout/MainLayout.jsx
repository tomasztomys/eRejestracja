import React, { PropTypes } from 'react';
import classnames from 'classnames';
import SVG from 'svg-inline-react';

import { Panel, Layout, IconButton } from 'react-toolbox';
import { AppBar, Avatar } from 'ui';

import doctorAvatar from 'assets/doctor.jpg';
import { MenuDrawer } from './subcomponents';

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
          <AppBar>
            <IconButton
              icon={ drawerActive ? 'close' : 'menu' }
              className={ style['hamburger'] }
              inverse
              onClick={ this.toggleDrawerActive.bind(this) }
            />
            <div className={ style['app-bar'] }>
              <div className={ style['left-content'] }>
                <div className={ style['logo'] }>
                  <SVG
                    src={ logo }
                  />
                </div>
                <div className={ style['title'] }>eRejestracja</div>
              </div>

              <div className={ style['right-content'] }>
                <div className={ style['avatar'] }>
                  <Gravatar email={ user.email } />
                </div>
                <div className={ style['user-name'] }>{ appBarLabel }</div>
              </div>

            </div>

          </AppBar>
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