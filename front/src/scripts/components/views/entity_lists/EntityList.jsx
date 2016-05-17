import React, { Component, PropTypes } from 'react';

import {
  Table,
  Button,
  CardWithHeader,
  CardTitle,
  Grid,
  GridItem
} from 'ui';

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
                source={ source }
                model={ model }
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