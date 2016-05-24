import React, { PropTypes } from 'react';
import TableReactToolbox from 'react-toolbox/lib/table';
import classnames from 'classnames';

import style from './table.scss';

import { IconButton } from '../icon_button';

export default class Table extends React.Component {
  addDeleteIcon(source, model, onClick) {
    model.delete = { type: Object };
    source = source.map((item, index) => {
      let id = item.id || index;

      item.delete = (
        <IconButton
          icon="delete"
          key={ `delete${ id }` }
          className={ style['icon-cell'] }
          onClick={ onClick.bind(this, item.id) }
        />
      );
      return item;
    });

    return {
      model,
      source
    };
  }

  addEditIcon(source, model, onClick) {
    model.edit = { type: Object };
    source = source.map((item, index) => {
      let id = item.id || index;

      item.edit = (
        <IconButton
          icon="edit"
          key={ `edit${ id }` }
          className={ style['icon-cell'] }
          onClick={ onClick.bind(this, item.id) }
        />
      );
      return item;
    });

    return {
      model,
      source
    };
  }

  addEditIconToModel(model) {
    model.edit = { type: Object };
    return model;
  }

  render() {
    let { className, source, model, onEditItem, onDeleteItem, ...otherProps } = this.props;
    let tableStyle = classnames(style['table'], className);
    let date = {
      model,
      source
    };

    if (onEditItem) {
      date = this.addEditIcon(date.source, date.model, onEditItem);
    }

    if (onDeleteItem) {
      date = this.addDeleteIcon(date.source, date.model, onDeleteItem);
    }

    return (
      <TableReactToolbox
        className={ tableStyle }
        source={ date.source }
        model={ date.model }
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
  onEditItem: PropTypes.func,
  onDeleteItem: PropTypes.func
};
