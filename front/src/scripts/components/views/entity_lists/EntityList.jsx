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
      onChangeTable,
      title
    } = this.props;

    return (
      <div>
        <h1>
          { title }
        </h1>
        <Table
          source={ source }
          model={ model }
          onSelect={ onSelect }
          selectable={ selectable }
          selected={ selected }
          onChange={ onChangeTable }
        />
      </div>

    );
  }
}

EntityList.propTypes = {
  model: PropTypes.object.Required,
  onChange: PropTypes.func,
  heading: PropTypes.bool,
  onSelect: PropTypes.func,
  selectable: PropTypes.bool,
  selected: PropTypes.array,
  source: PropTypes.array,
  className: PropTypes.string,
};