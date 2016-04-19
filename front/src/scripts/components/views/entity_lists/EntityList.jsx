import React, { Component, PropTypes } from 'react';

import {
  Table
} from '../../ui';

export default class EntityList extends Component {

  render() {
    let {
      source,
      model,
      onSelect,
      selectable,
      selected,
      onChangeTable
    } = this.props;

    return (
      <Table
        source={ source }
        model={ model }
        onSelect={ onSelect }
        selectable={ selectable }
        selected={ selected }
        onChange={ onChangeTable }
      />
    );
  }
}

EntityList.propTypes = {
  model: PropTypes.object,
  onChange: PropTypes.func,
  heading: PropTypes.bool,
  onSelect: PropTypes.func,
  selectable: PropTypes.bool,
  selected: PropTypes.array,
  source: PropTypes.array,
};