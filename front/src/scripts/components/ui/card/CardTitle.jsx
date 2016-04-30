import React, { Component, PropTypes } from 'react';

import { CardTitle as CardTitleReactToolbox } from 'react-toolbox/lib/card';
import classnames from 'classnames';

import style from './card_title';

export default class CardTitle extends Component {
  render() {
    let { className, ...otherProps } = this.props;

    return (
      <CardTitleReactToolbox
        className={ classnames(className, style['card-title']) }
        { ...otherProps }
      />
    );
  }
}

CardTitle.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any
};