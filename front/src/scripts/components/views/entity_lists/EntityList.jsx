import React, { Component, PropTypes } from 'react';

import {
  Table,
  Button
} from '../../ui';

export default class EntityList extends Component {

  _renderButtons() {
    let { buttons } = this.props;

    return buttons.map((item) => {
      return (
        <Button
          key={ item.label }
          label={ item.label }
          onChange={ item.onChange }
        />
      );
    });
  }
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
        { this._renderButtons() }
      </div>

    );
  }
}

EntityList.propTypes = {
  title: PropTypes.string,
  model: PropTypes.object,
  onChangeTable: PropTypes.func,
  heading: PropTypes.bool,
  onSelect: PropTypes.func,
  selectable: PropTypes.bool,
  selected: PropTypes.array,
  source: PropTypes.array,
  className: PropTypes.string,
  buttons: PropTypes.array
};