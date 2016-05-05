import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import flexboxgrid from 'flexboxgrid';

import style from './grid.scss';

export default class GridItem extends Component {
    getFlexboxClass(property, value){
      if (value) {
        return flexboxgrid[property + "-" + value];
      }

      return "";
    }

    getCustomClass(property, value){
      if (value) {
        return style[property + "-" + value];
      }

      return "";
    }

    _renderItem(itemStyle) {
      let style = this.props.style || {};
      let onClick = this.props.onClick || null;
      return (
        <div className={itemStyle} style={style} onClick={ onClick }>
          {this.props.children}
        </div>
      )
    }

    render() {
      const {xxsSize, xsSize, smSize, mdSize, lgSize,
             xsOffset, smOffset, mdOffset, lgOffset,
             xxsLast, xsLast, mdLast} = this.props;

      let itemStyle = classnames(
                this.props.className,
                this.getCustomClass("col-xxs", xxsSize),
                xxsLast ? style["last-xxs"] : "",
                this.getFlexboxClass("col-xs", xsSize),
                xsLast ? flexboxgrid["last-xs"] : "",
                this.getFlexboxClass("col-sm", smSize),
                this.getFlexboxClass("col-md", mdSize),
                mdLast ? flexboxgrid["last-md"] : "",
                this.getFlexboxClass("col-lg", lgSize),
                this.getFlexboxClass("col-xs-offset", xsOffset),
                this.getFlexboxClass("col-sm-offset", smOffset),
                this.getFlexboxClass("col-md-offset", mdOffset),
                this.getFlexboxClass("col-lg-offset", lgOffset) );

      return this._renderItem(itemStyle);
    }
}

GridItem.propTypes = {
  xsSize: PropTypes.string,
  smSize: PropTypes.string,
  mdSize: PropTypes.string,
  lgSize: PropTypes.string,
  xsOffset: PropTypes.string,
  smOffset: PropTypes.string,
  mdOffset: PropTypes.string,
  lgOffset: PropTypes.string
}
