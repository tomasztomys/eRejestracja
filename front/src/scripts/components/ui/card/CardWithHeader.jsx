import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import Card from './Card';
import CardTitle from './CardTitle';
import CardActions from './CardActions';
import { Button } from '../';

import style from './card_with_header.scss';

export default class CardWithHeader extends Component {

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
      <Card
        className={ classnames(style['card-with-header'], className) }
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
      </Card>
    );
  }
}

CardWithHeader.defaultProps = {
  actions: []
};

CardWithHeader.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  actions: PropTypes.array,
  children: PropTypes.any
};