import React, { PropTypes } from 'react';
import AvatarReactToolbox from 'react-toolbox/lib/avatar';
import classnames from 'classnames';

import style from './avatar.scss';

export default class Avatar extends React.Component {

  render() {
    let { className, ...otherProps } = this.props;
    let avatarStyle = classnames(style['avatar'], className);

    return (
      <AvatarReactToolbox
        className={ avatarStyle }
        { ...otherProps }
      />
    );
  }
}

Avatar.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
  image: PropTypes.string,
  children: PropTypes.node,
};
