import React, { Component, PropTypes } from 'react';

import {
  Button,
  Avatar,
  FontIcon
} from '../../ui';

import style from './style/main_layout.scss';

// import {
//   MenuDrawer
// } from './subcomponents';

import {
  AppBar
} from '../../app_bar';

import doctorAvatar from '../../../../../assets/doctor.jpg';

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
    let { name, surname, userType } = this.props;
    let appBarLabel = `${ name } ${ surname }`;

    return (
      <div className={ style['root'] }>
        <AppBar />
      </div>
    );
  }
}

MainLayout.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
  surname: PropTypes.string,
  userType: PropTypes.oneOf([ 'admin', 'patient', 'doctor' ])
};