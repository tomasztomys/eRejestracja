import React, { Component, PropTypes } from 'react';

import {
  Button,
} from '../../ui';

import SVG from 'svg-inline-react';

import style from './main_site.scss';

import snake from '../../../../assets/snake.svg';
import logo from '../../../../assets/logo.svg';

export default class MainSite extends Component {

  render() {
    return (
      <div className={ style['root'] }>
          <div className={ style['header-bar'] }>
          <div className={ style['logo']}>
            <SVG
              src={ logo }
            />
          </div>
            <div className={ style['website-title']}>eRegistration</div>
          </div>
          <div className={ style['patient-content'] }>
            <SVG
              className={ style['snake'] }
              src={ snake }
            />
            <div className={ style['title'] }>PATIENT<p>CENTER</p></div>
            <div>
              <Button
                className={ style['sign-in-button'] }
                label="Sign up"
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
                  className={ style['sign-in-button'] }
                  label="Sign up"
                />
              </div>
            </div>
          </div>
      </div>
    );
  }
}
