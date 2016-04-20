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
          onClick={ item.onClick }
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
        { source.length > 0 ?
          <Table
            source={ source }
            model={ model }
            onSelect={ onSelect }
            selectable={ selectable }
            selected={ selected }
            onChange={ onChangeTable }
          /> : <div>No doctors in database</div>
        }

        { source.length > 0 ? this._renderButtons() : null }
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