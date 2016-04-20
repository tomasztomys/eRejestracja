import React, { Component } from 'react';

import {
  Button
} from '../../ui';

export default class Demo extends Component {

  render() {
    return (
      <div>
        <Button
          label="CLICK"
          sizeType="small"
        />
      </div>
    );
  }
}