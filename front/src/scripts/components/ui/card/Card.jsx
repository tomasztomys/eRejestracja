import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import { Card as CardReactToolbox } from 'react-toolbox/lib/card';
import CardTitle from './CardTitle';
import CardActions from './CardActions';
import { Button } from '../';

import style from './card.scss';

export default class Card extends Component {

  _renderButtons(buttons) {
    return buttons.map((item) => {
      return (
        <Button
          key={ item.label }
          label={ item.label }
          className={ item.className }
          sizeType={ item.sizeType }
          onClick={ item.onClick }
          disabled={ item.disabled || false }
        />
      );
    });
  }

  render() {
    let { className, title, subtitle, actions, children, ...otherProps } = this.props;

    return (
      <CardReactToolbox
        className={ classnames(style['card'], className) }
        { ...otherProps }
      >
       { title ?
         <CardTitle
           title={ title }
           subtitle={ subtitle }
         /> : ''
       }
        <div className={ style['content'] }>
          { children }
        </div>
        <div className={ style['actions'] }>
          { this._renderButtons(actions) }
        </div>
      </CardReactToolbox>
    );
  }
}

Card.defaultProps = {
  actions: []
};

Card.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  actions: PropTypes.array,
  children: PropTypes.any
};