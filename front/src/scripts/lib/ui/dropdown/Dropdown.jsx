import React, { PropTypes } from 'react';
import DropdownReactToolbox from 'react-toolbox/lib/dropdown';
import classnames from 'classnames';

import style from './dropdown.scss';

export default class Dropdown extends React.Component {

  render() {
    let { className, ...otherProps } = this.props;
    let dropdownStyle = classnames(style['rt-dropdown'], className);

    return (
      <DropdownReactToolbox
        className={ dropdownStyle }
        { ...otherProps }
      />
    );
  }
}

Dropdown.propTypes = {
  className: PropTypes.string,
};
