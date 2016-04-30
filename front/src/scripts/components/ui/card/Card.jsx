import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import { Card as CardReactToolbox } from 'react-toolbox/lib/card';

import style from './card.scss';

export default class Card extends Component {
  render() {
    let { className, children, ...otherProps } = this.props;

    return (
      <CardReactToolbox
        className={ classnames(style['card'], className) }
        { ...otherProps }
      >
        <div className={ style['content'] }>
          { children }
        </div>
      </CardReactToolbox>
    );
  }
}

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any
};