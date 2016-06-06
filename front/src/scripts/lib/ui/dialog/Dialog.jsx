import React, { PropTypes } from 'react';
import DialogReactToolbox from 'react-toolbox/lib/dialog';
import { CardWithHeader } from '../card';
import classnames from 'classnames';

import style from './dialog.scss';

export default class Dialog extends React.Component {

  render() {
    let { className, title, subtitle, actions, active, onOverlayClick, ...otherProps } = this.props;
    let dialogStyle = classnames(
      style['rt-dialog'],
      className
    );

    return (
      <DialogReactToolbox
        className={ dialogStyle }
        title={ title }
        actions={ actions }
        active={ active }
        onEscKeyDown={ onOverlayClick }
        onOverlayClick={ onOverlayClick }
        { ...otherProps }
      />
    );
  }
}

Dialog.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  actions: PropTypes.array,
  active: PropTypes.bool,
  onOverlayClick: PropTypes.func
};
