import React, { Component, PropTypes } from 'react';

import {
  Button,
} from '../../ui';

import SVG from 'svg-inline-react';

import Paths from '../../../constants/PathsConstants.jsx'

import style from './main_site.scss';

import snake from '../../../../assets/snake.svg';
import heart from '../../../../assets/heart.svg';
import logo from '../../../../assets/logo.svg';

export default class MainSite extends Component {
  _routeHandler(where) {
    console.log(where);
    this.context.router.push(where);
  }

  render() {
    return (
      <div className={ style['root'] }>
        <div className={ style['header-bar'] }>
          <div className={ style['logo'] }>
            <SVG
              src={ logo }
            />
          </div>
          <div className={ style['website-title'] }>eRegistration</div>
          <Button
            className={ style['sign-in-button'] }
            onClick={ this._routeHandler.bind(this, Paths.login) }
            label="Sign in"
          />
        </div>
        <div className={ style['patient-content'] }>
          <SVG
            className={ style['pill'] }
            src={ heart }
          />
          <div className={ style['title'] }>PATIENT<p>CENTER</p></div>
          <div>
            <Button
              className={ style['sign-up-button'] }
              label="Sign up"
              onClick={ this._routeHandler.bind(this, Paths.patients.registration) }
            />
          </div>
        </div>

        <div className={ style['doctor-content-border'] }>
          <div className={ style['doctor-content']}>
            <SVG
              className={ style['snake'] }
              src={ snake }
            />
            <div className={ style['title'] }>DOCTOR<p>CENTER</p></div>
            <div>
              <Button
                className={ style['sign-up-button'] }
                label="Sign up"
                onClick={ this._routeHandler.bind(this, Paths.doctors.registration) }
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MainSite.contextTypes = {
  router: React.PropTypes.object
};

