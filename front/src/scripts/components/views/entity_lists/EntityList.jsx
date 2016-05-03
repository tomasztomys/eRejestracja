import React, { Component, PropTypes } from 'react';

import {
  Table,
  Button,
  Card,
  CardTitle,
  Grid,
  GridItem
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
      title,
      noDataMessage
    } = this.props;

    return (
      <Grid>
        <GridItem xsSize="12">
          <Card>
            <CardTitle
              title={ title }
              subtitle="You can remove doctor or edit."
            />
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
            { source.length > 0 ? this._renderButtons() : null }
          </Card>
        </GridItem>
      </Grid>

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
  buttons: PropTypes.array,
  noDataMessage: PropTypes.string
};