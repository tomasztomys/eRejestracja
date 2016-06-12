import React, { Component, PropTypes } from 'react';

import * as Action from 'actions/Actions';
import { connect } from 'react-redux';
import Paths from 'constants/PathsConstants';
class ConfirmEmail extends Component {

  componentDidMount() {
    let { query } = this.props.location;
    let token = query ? query.token : null;

    Action.confirmEmail(token, this.props.dispatch).then((data) => {
      if (data) {
         this.context.router.push(Paths.login);
      }
      else {
        this.context.router.push(Paths.root);
      }
    });
  }

  render() {
    return (
      <div></div>
    );
  }

}

ConfirmEmail.contextTypes = {
  router: React.PropTypes.object
};


export default connect()(ConfirmEmail);