import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import { IconButton } from 'react-toolbox';

import Card from './Card';
import CardTitle from './CardTitle';
import CardActions from './CardActions';
import { Button, FontIcon } from '../';

import style from './card_with_closing.scss';

export default class CardWithClosing extends Component {
  _renderButtons(buttons) {
    return buttons.map((item) => {
      return (
        <Button
          key={ item.label }
          label={ item.label }
          className={ item.className }
          sizeType={ item.sizeType }
          onClick={ item.onClick }
          type={ item.type }
          disabled={ item.disabled || false }
          primary={ item.primary }
        />
      );
    });
  }

  render() {
    let {
      className,
      title,
      subtitle,
      actions,
      children,
      open,
      onToogleBox,
      ...otherProps
    } = this.props;
    let openIcon = open ? 'keyboard_arrow_up' : 'keyboard_arrow_down';

    return (
      <Card
        className={ classnames(style['card-with-closing'], className) }
        { ...otherProps }
      >
        <div className={ style['header'] }>
          { title ?
            <CardTitle
              className={ style['card-title'] }
              title={ title }
              subtitle={ subtitle }
            /> : ''
          }
          { onToogleBox ?
            <IconButton
              className={ style['open-icon'] }
              icon={ openIcon }
              onClick={ onToogleBox }
            /> : null
          }
        </div>
        <div
          className={
            classnames(
              style['body'],
              { [style['open']]: open || !onToogleBox }
            )
          }
        >
          <div className={ style['content'] }>
            { children }
          </div>
          <div className={ style['actions'] }>
            { this._renderButtons(actions) }
          </div>
        </div>
      </Card>
    );
  }
}

CardWithClosing.defaultProps = {
  actions: []
};

CardWithClosing.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  actions: PropTypes.array,
  children: PropTypes.any,
  open: PropTypes.bool,
  onToogleBox: PropTypes.func
};