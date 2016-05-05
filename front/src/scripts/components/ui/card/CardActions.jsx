import React, { Component, PropTypes } from 'react';

import { CardActions as CardActionsReactToolbox } from 'react-toolbox/lib/card';
import classnames from 'classnames';

import style from './card_actions.scss';

export default class CardActions extends Component {
  render() {
    let { className, ...otherProps } = this.props;

    return (
      <CardActionsReactToolbox
        className={ classnames(style['card-actions'], className) }
        { ...otherProps }
      />
    );
  }
}

CardActions.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any
};