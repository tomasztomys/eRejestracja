import React, { PropTypes } from 'react';
import TableReactToolbox from 'react-toolbox/lib/table';

export default class Table extends React.Component {
  render() {
    let { className, ...otherProps } = this.props;

    return (
      <TableReactToolbox
        className={ className }
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
