import React, { Component, PropTypes } from 'react';

import {
} from '../../../ui';

import style from './style/main_layout';

export default class Userpanel extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <div className={ style['root'] }>
        <header className={ style['header'] }>
          <div className={ style['user-name'] }>Dariusz Paluch</div>
        </header>
        <div className={ style['body'] }>
          dasdasd
          das
          dasd
          a
          { this.props.children }
        </div>
      </div>
    );
  }
}

Userpanel.propTypes = {
  children: PropTypes.node
};