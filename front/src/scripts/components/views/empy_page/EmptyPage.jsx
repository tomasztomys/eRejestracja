import React, { Component } from 'react';
import Paths from '../../../constants/PathsConstants';

import {
  Button,
} from '../../ui';

export default class EmptyPage extends Component {

  backToMainPage() {
    this.context.router.push(Paths.root);
  }

  render() {
    return (
      <div>
        <h1>PAGE IS NOT READY YET</h1>
        <Button onClick={ this.backToMainPage.bind(this) }>Back to Main page</Button>
      </div>
    );
  }
}

EmptyPage.contextTypes = {
  router: React.PropTypes.object
};