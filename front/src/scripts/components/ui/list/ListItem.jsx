import React, { PropTypes } from 'react';
import { ListItem as ListItemReactToolbox } from 'react-toolbox/lib/list';
import classnames from 'classnames';

import style from './list-item.scss';

export default class ListItem extends React.Component {
  render() {
    let { className, ...otherProps } = this.props;
    let listItemStyle = classnames(style['list-item'], className);

    return (
      <ListItemReactToolbox
        className={ listItemStyle }
        { ...otherProps }
      >
        { this.props.children }
      </ListItemReactToolbox>
    );
  }
}

ListItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};
