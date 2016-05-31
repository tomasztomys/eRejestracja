import React, { PropTypes } from 'react';
import SliderReactToolbox from 'react-toolbox/lib/slider';
import classnames from 'classnames';

import style from './slider.scss';

export default class Slider extends React.Component {

  onChange(value) {
    let { step, onChange } = this.props;
    let modValue = value % step;

    if (modValue === 0) {
      onChange(value);
    }
    else if (modValue <= (step / 2)) {
      onChange(value - modValue);
    }
    else {
      onChange(value - modValue + step);
    }
  }

  render() {
    let {
      className,
      label,
      max,
      min,
      onChange,
      snaps,
      ...otherProps
    } = this.props;

    let sliderStyle = classnames(style['rt-slider'], className);

    return (
      <div className={ style['slider-component'] }>
        <p className={ style['label'] }>{ label }</p>
        <SliderReactToolbox
          className={ sliderStyle }
          max={ max }
          min={ min }
          onChange={ this.onChange.bind(this) }
          snaps={ snaps }
          pinned
          snaps
          editable
          { ...otherProps }
        />
      </div>
    );
  }
}

Slider.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  max: PropTypes.number,
  min: PropTypes.number,
  onChange: PropTypes.func,
  snaps: PropTypes.bool
};
