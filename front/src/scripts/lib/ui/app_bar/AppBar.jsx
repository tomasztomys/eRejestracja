import React, { PropTypes } from 'react';
import { AppBar as ReactAppBar } from 'react-toolbox';
import classnames from 'classnames';

import style from './app_bar.scss';

export default class AppBar extends React.Component {

  render() {
    let { className, children, ...otherProps } = this.props;
    let appBarStyle = classnames(style['app-bar'], className);

    return (
      <ReactAppBar
        className={ appBarStyle }
        { ...otherProps }
      >
        { children }
      </ReactAppBar>
    );
  }
}

AppBar.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any
};
