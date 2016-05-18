import React, { PropTypes } from 'react';
import classnames from 'classnames';

import style from './circle_avatar.scss';
import Gravatar from 'react-gravatar';

export default class CircleAvatar extends React.Component {

  render() {
    let { className, email, ...otherProps } = this.props;

    let circleAvatarStyle = classnames(
      style['circle-avatar'],
      className
    );

    return (
      <div className={ circleAvatarStyle }>
        <Gravatar
          email={ email }
          { ...otherProps }
        />
      </div>

    );
  }
}

CircleAvatar.propTypes = {
  className: PropTypes.string,
  email: PropTypes.string
};
