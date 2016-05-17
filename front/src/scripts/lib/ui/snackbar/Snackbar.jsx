import React, { PropTypes } from 'react';
import SnackbarReactToolbox from 'react-toolbox/lib/snackbar';
import classnames from 'classnames';

import style from './snackbar.scss';

export default class Snackbar extends React.Component {

  render() {
    let { className, ...otherProps } = this.props;
    let snackbarStyle = classnames(style['snackbar'], className);

    return (
      <SnackbarReactToolbox
        className={ snackbarStyle }
        { ...otherProps }
      />
    );
  }
}

Snackbar.propTypes = {
  className: PropTypes.string,
  active: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onTimeout: PropTypes.func,
  timeout: PropTypes.number
};
