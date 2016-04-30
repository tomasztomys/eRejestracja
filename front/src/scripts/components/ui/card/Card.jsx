import React, { Component, PropTypes } from 'react';

import { Card as CardReactToolbox } from 'react-toolbox/lib/card';

import style from './card';

export default class Card extends Component {
  render() {
    return (
      <CardReactToolbox
        className={ style['card'] }
      >
        { this.props.children }
      </CardReactToolbox>
    );
  }
}

Card.propTypes = {
  children: PropTypes.any
};