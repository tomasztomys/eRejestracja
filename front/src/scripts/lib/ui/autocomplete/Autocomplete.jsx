import React, { PropTypes } from 'react';
import AutocompleteReactToolbox from 'react-toolbox/lib/autocomplete';
import classnames from 'classnames';

import style from './Autocomplete.scss';

export default class Autocomplete extends React.Component {

  render() {
    let {
      className,
      label,
      onChange,
      source,
      value,
      ...otherProps
    } = this.props;
    let AutocompleteStyle = classnames(style['autocomplete'], className);

    return (
      <AutocompleteReactToolbox
        className={ AutocompleteStyle }
        direction="down"
        label={ label }
        onChange={ onChange }
        source={ source }
        value={ value }
        { ...otherProps }
      />
    );
  }
}

Autocomplete.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  source: PropTypes.object,
  value: PropTypes.array
};
