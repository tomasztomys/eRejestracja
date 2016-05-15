import React, { Component, PropTypes } from 'react';

import {
  CardWithHeader,
} from '../../../../ui';

import style from './picker_box.scss';

export default class PickerBox extends Component {
  render() {
    let { title, subtitle, children, onBackStep, onNextStep } = this.props;
    let actions = [];

    if (onBackStep) {
      actions.push(
        {
          label: 'Back',
          onClick: onBackStep,
          className: style['back-button'],
          type: 'secondary'
        }
      );
    }

    if (onNextStep) {
      actions.push(
        {
          label: 'Next',
          onClick: onNextStep,
          className: style['next-button'],
        }
      );
    }

    return (
      <CardWithHeader
        className={ style['picker-box'] }
        title={ title }
        subtitle={ subtitle }
        actions={ actions }
      >
        { children }
      </CardWithHeader>
    );
  }
}

PickerBox.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  onBackStep: PropTypes.func,
  onNextStep: PropTypes.func,
  children: PropTypes.any,
};