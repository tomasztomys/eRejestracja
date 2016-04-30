import React, { Component, PropTypes } from 'react';

import { ChangePasswordBox } from './subcomponents/change_password_box';

export default class PersonEdition extends Component {

  render() {
    return (
      <div>
        <ChangePasswordBox />
      </div>
    );
  }

}

PersonEdition.propTypes = {
};