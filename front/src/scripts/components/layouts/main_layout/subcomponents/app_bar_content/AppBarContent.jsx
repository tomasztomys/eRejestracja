import React, { PropTypes } from 'react';
import classnames from 'classnames';
import SVG from 'svg-inline-react';

import { Panel, Layout, IconButton } from 'react-toolbox';
import { AppBar } from 'ui';

import Gravatar from 'react-gravatar';

import style from './app_bar_content.scss';

import logo from 'assets/logo.svg';

export default class AppBarContent extends React.Component {
  render() {
    let { drawerActive, user, toggleDrawerActive } = this.props;
    let appBarLabel = `${ user.name } ${ user.surname }`;

    return (
      <AppBar>
        <IconButton
          icon={ drawerActive ? 'close' : 'menu' }
          className={ style['hamburger'] }
          inverse
          onClick={ toggleDrawerActive }
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
    );
  }
}

AppBarContent.propTypes = {
  drawerActive: PropTypes.bool,
  user: PropTypes.shape({
    name: PropTypes.string,
    surname: PropTypes.string,
    email: PropTypes.string,
  }),
  toggleDrawerActive: PropTypes.func
};