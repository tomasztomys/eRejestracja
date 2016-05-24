import React, { Component } from 'react';

import {
  Button,
} from 'ui';

import style from './dashboard.scss';

export default class Dashboard extends Component {
  render() {
    let { user, userType } = this.props;

    return (
      <div className={ style['dashboard'] }>
        <h1>Online Patient Registration</h1>
        <h3>Online Patient Registration System is a system to plan visit in doctors with notification about planned or cancelled visit to the doctor.</h3>
        <section>
          <h2>Hello { `${ user.name } ${ user.surname }` }!</h2>
          <p>You are a { `${ user.type }` }. It is nice to see you in our system.
            We hope that system will not cause you any problem.
            Otherwise, you can contact with us by send mail to <a href="mailto:tomasz@tomys.pl">Administrator</a>.
          </p>
        </section>
      </div>
    );
  }
}