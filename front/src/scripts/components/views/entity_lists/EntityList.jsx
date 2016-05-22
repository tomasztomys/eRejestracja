import React, { Component, PropTypes } from 'react';
import {
  Table,
  CardWithHeader,
  Grid,
  GridItem,
  CircleAvatar
} from 'ui';

import { mergeObjects } from '../../../utilities';

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
      noDataMessage,
      onEditItem,
      onDeleteItem
    } = this.props;

    let sourceData = source.map((item) => {
      item.avatar = (
        <CircleAvatar
          className={ style['avatar'] }
          email={ item.email }
        />
      );
      return item;
    });

    let modelData = { avatar: { type: Object }};

    modelData = mergeObjects(modelData, model);

    return (
      <Grid center>
        <GridItem xsSize="10">
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
                onEditItem={ onEditItem.bind(this) }
                onDeleteItem={ onDeleteItem.bind(this) }
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
  noDataMessage: PropTypes.string,
  onEditItem: PropTypes.func,
  onDeleteItem: PropTypes.func
};