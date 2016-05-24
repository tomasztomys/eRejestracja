import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  Table,
  CardWithHeader,
  Grid,
  GridItem,
  CircleAvatar
} from 'ui';

import { mergeObjects } from '../../../utilities';
import * as userReducer from 'reducers/user';
import style from './entity_list.scss';

class EntityList extends Component {
  constructor() {
    super();
    this.state = {
      selectable: false,
      showEdit: false,
      showDelete: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userType === 'admin') {
      this.turnOnAdminOptions();
    }
  }

  turnOnAdminOptions() {
    this.setState({
      selectable: true,
      showEdit: true,
      showDelete: true
    });
  }

  render() {
    let {
      title,
      subtitle,
      source,
      model,
      onSelect,
      selected,
      onChangeTable,
      buttons,
      noDataMessage,
      onEditItem,
      onDeleteItem
    } = this.props;

    let {
      selectable,
      showEdit,
      showDelete
    } = this.state;

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
            actions={ (source.length && showDelete) ? buttons : [] }
          >
            { source.length > 0 ?
              <Table
                source={ sourceData }
                model={ modelData }
                onSelect={ onSelect }
                selectable={ selectable }
                selected={ selected }
                onChange={ onChangeTable }
                onEditItem={ showEdit ? onEditItem.bind(this) : null }
                onDeleteItem={ showDelete ? onDeleteItem.bind(this) : null }
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
  selected: PropTypes.array,
  source: PropTypes.array,
  className: PropTypes.string,
  buttons: PropTypes.array,
  noDataMessage: PropTypes.string,
  onEditItem: PropTypes.func,
  onDeleteItem: PropTypes.func
};

function select(state) {

  state = state.toJS();
  return {
    userType: userReducer.getUserType(state),
  };
}

export default connect(select)(EntityList);