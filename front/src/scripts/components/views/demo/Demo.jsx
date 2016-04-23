import React, { Component } from 'react';

import {
  Button,
  Checkbox,
  Snackbar
} from '../../ui';

export default class Demo extends Component {
  constructor() {
    super();
    this.state = {
      checkboxValue: false,
      activeSnackbar: false
    };
  }

  _onCheckboxChange(value) {
    this.setState({
      checkboxValue: value
    });
  }

  _onShowSnackbar() {
    this.setState({
      activeSnackbar: true
    });
  }

  _onHideSnackbar() {
    this.setState({
      activeSnackbar: false
    });
  }

  render() {
    return (
      <div>
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
          active={ this.state.activeSnackbar }
          timeout={ 2500 }
          onTimeout={ this._onHideSnackbar.bind(this) }
        />
      </div>
    );
  }
}