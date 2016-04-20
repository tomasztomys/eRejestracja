import React, { Component } from 'react';

import {
  Button
} from '../../ui';

export default class Demo extends Component {

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

      </div>
    );
  }
}