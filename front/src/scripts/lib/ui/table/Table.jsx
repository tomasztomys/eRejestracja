import React, { PropTypes } from 'react';
import TableReactToolbox from 'react-toolbox/lib/table';
import classnames from 'classnames';

import style from './table.scss';

export default class Table extends React.Component {
  render() {
    let { className, ...otherProps } = this.props;
    let tableStyle = classnames(style['table'], className);

    return (
      <TableReactToolbox
        className={ tableStyle }
        { ...otherProps }
      />
    );
  }
}

Table.propTypes = {
  model: PropTypes.object,
  onChange: PropTypes.func,
  heading: PropTypes.bool,
  onSelect: PropTypes.func, // When row selection changes
  selectable: PropTypes.bool, // Show checkbox
  selected: PropTypes.array, // selected items
  source: PropTypes.array,
  className: PropTypes.string,
};
