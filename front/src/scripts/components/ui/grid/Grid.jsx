/**
 *    This grid system has four tiers of classes: xs (phones), sm (tablets), md (desktops), and lg (larger desktops).
 *
 *  <Grid>
 *    <GridItem xsSize=4 mdSize=5 lgSize=7> One </GridItem>
 *    <GridItem xsSize=4 xsOffset=2> Two </GridItem>
 *  </Grid>
**/

import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import flexboxgrid from 'flexboxgrid';

import style from './grid.scss';

export default class Grid extends Component {
  getClass(property, value) {
    if (value) {
      return flexboxgrid[`${ value }-${ property }`];
    }

    return '';
  }

  render() {
    const { onClick, xsPosition, smPosition, mdPosition, lgPosition,
    center, start, end, bottom } = this.props;

    let gridStyle = classnames(flexboxgrid["row"],
                    style['grid'],
                    this.props.className,
                    this.getClass("xs", xsPosition),
                    this.getClass("sm", smPosition),
                    this.getClass("md", mdPosition),
                    this.getClass("lg", lgPosition),
                    start ? flexboxgrid["start-xs"] : "",
                    center ? flexboxgrid["center-xs"] : "",
                    end ? flexboxgrid["end-xs"] : "",
                    bottom ? flexboxgrid["bottom-xs"] : ""
    );

    return (
      <div className={gridStyle} onClick={ onClick }>
        {this.props.children}
      </div>
    );
  }
}

Grid.propTypes = {
  xsPosition: PropTypes.oneOf(['bottom', 'middle', 'top']),
  smPosition: PropTypes.oneOf(['bottom', 'middle', 'top']),
  mdPosition: PropTypes.oneOf(['bottom', 'middle', 'top']),
  lgPosition: PropTypes.oneOf(['bottom', 'middle', 'top']),
}
