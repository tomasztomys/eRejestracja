import React, { Component, PropTypes } from 'react';
import { IconButton } from 'react-toolbox';
import {
  Table,
  Button,
  CardWithHeader,
  CardTitle,
  Grid,
  GridItem,
  FontIcon
} from 'ui';

import style from './entity_list.scss';

export default class EntityList extends Component {
  render() {
    let {
      title,
      subtitle,
      source,
      model,
      onSelect,
      selectable,
      selected,
      onChangeTable,
      buttons,
      noDataMessage
    } = this.props;

    let sourceData = source.map((item) => {
      item.edit = (
        <IconButton
          icon="edit"
          key={ `edit${ item.id }` }
          className={ style['icon-cell'] }
          onClick={ this.props.onEditItem.bind(this, item.id) }
        />
      );

      item.delete = (
        <IconButton
          icon="delete"
          key={ `delete${ item.id }` }
          onClick={ this.props.onDeleteItem.bind(this, item.id) }
          className={ style['icon-cell'] }
        />
      );
      return item;
    });
    let modelData = model;

    modelData.edit = { type: Object };
    modelData.delete = { type: Object };

    return (
      <Grid center>
        <GridItem xsSize="6">
          <CardWithHeader
            title={ title }
            subtitle={ subtitle }
            actions={ source.length ? buttons : [] }
          >
            { source.length > 0 ?
              <Table
                source={ sourceData }
                model={ modelData }
                onSelect={ onSelect }
                selectable={ selectable }
                selected={ selected }
                onChange={ onChangeTable }
              /> : <div>{ noDataMessage }</div>
            }
          </CardWithHeader>
        </GridItem>
      </Grid>

    );
  }
}

EntityList.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  model: PropTypes.object,
  onChangeTable: PropTypes.func,
  heading: PropTypes.bool,
  onSelect: PropTypes.func,
  selectable: PropTypes.bool,
  selected: PropTypes.array,
  source: PropTypes.array,
  className: PropTypes.string,
  buttons: PropTypes.array,
  noDataMessage: PropTypes.string
};