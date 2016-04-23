import React, { Component } from 'react';

import {
  Button,
  Checkbox
} from '../../ui';

export default class Demo extends Component {
  constructor() {
    super()
    this.state = {
      checkboxValue: false
    }
  }

  _onCheckboxChange(value) {
    this.setState({
      checkboxValue: value
    })
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
      </div>
    );
  }
}