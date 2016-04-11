import React, { PropTypes } from 'react';
import { List as ListReactToolbox } from 'react-toolbox/lib/list';
import { ListItem as ListItemReactToolbox } from 'react-toolbox/lib/list';
import classnames from 'classnames';

import style from './list.scss';

export default class List extends React.Component {

  render() {
    let { className, ...otherProps } = this.props;

    let children = React.Children.map(this.props.children, (element) => {
      let { ...elementProps } = element.props;

      return (
        <ListItemReactToolbox {...elementProps} />
      );
    });

    let listStyle = classnames(style['list'], className);

    return (
      <ListReactToolbox
        className={ listStyle }
        selectable
        ripple={ false }
        { ...otherProps }
      >
        { children }
      </ListReactToolbox>
    );
  }
}

List.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};
