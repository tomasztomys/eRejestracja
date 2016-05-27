import React, { Component } from 'react';

import {
  Button,
  Checkbox,
  Snackbar,
  Drawer,
  Avatar,
  Dropdown
} from 'lib/ui';

import { BigCalendar } from 'lib/big_calendar';

export default class Demo extends Component {
  constructor() {
    super();
    this.state = {
      checkboxValue: false,
      snackbarActive: false,
      drawerActive: false,
      dropdownValue: ''
    };
  }

  _onCheckboxChange(value) {
    this.setState({
      checkboxValue: value
    });
  }

  _onShowSnackbar() {
    this.setState({
      snackbarActive: true
    });
  }

  _onHideSnackbar() {
    this.setState({
      snackbarActive: false
    });
  }

  _onShowDrawer() {
    this.setState({
      drawerActive: true
    });
  }

  _onHideDrawer() {
    this.setState({
      drawerActive: false
    });
  }

  _onDropdownChange(dropdownValue) {
    this.setState({
      dropdownValue
    });
  }

  render() {
    return (
      <div>
      {/*
        <Button
          label="LARGE"
          sizeType="large"
        />
        <Button
          label="DEFAULT"
          sizeType="default"
        />
        <Button
          label="SMALL"
          sizeType="small"
        />
        <Button
          label="EKSTRA SMALL"
          sizeType="extra-small"
        />
        <Checkbox
          label="Checkbox"
          checked={ this.state.checkboxValue }
          onChange={ this._onCheckboxChange.bind(this) }
        />
        <Button
          label="Show snackbar."
          onClick={ this._onShowSnackbar.bind(this) }
        />
        <Snackbar
          label="Snackbar messages."
          active={ this.state.snackbarActive }
          timeout={ 2500 }
          onTimeout={ this._onHideSnackbar.bind(this) }
        />
        <Button
          label="Show Drawer"
          onClick={ this._onShowDrawer.bind(this) }
        />
        <Drawer
          active={ this.state.drawerActive }
          type="right"
          onOverlayClick={ this._onHideDrawer.bind(this) }
        />
        <Avatar
          title="Doctor avatar"
          image={ doctorAvatar }
        />
        <Avatar
          title="Patient men avatar"
          image={ patientMenAvatar }
        />
        <Avatar
          title="Patient woman avatar"
          image={ patientWomanAvatar }
        />
        <Dropdown
          label="Dropdown"
          source={ [
            { label: 'value1', value: 'value1' },
            { label: 'value2', value: 'value2' }
          ] }
          value={ this.state.dropdownValue }
          onChange={ this._onDropdownChange.bind(this) }
        /> */}
        <BigCalendar />
      </div>
    );
  }
}