import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';
import { default as ScriptjsLoader } from 'react-google-maps/lib/async/ScriptjsLoader';

import style from './google_maps.scss'
import mapStyle from './mapStyle';

export default class GoogleMaps extends React.Component {
  _renderMarkers(markers) {
    return markers.map((marker, index) => {
      return (
        <Marker
          key={ marker.key }
          position={ marker.position }
          defaultAnimation={ 2 }
        />
      );
    });
  }

  render() {
    let { className, defaultCenter, markers, zoom, onClick } = this.props;

    console.log(defaultCenter);
    if (!defaultCenter.lat && !defaultCenter.lng)
      return null;

    return (
      <div className={ classnames(style['react-google-maps'], className) }>
        <ScriptjsLoader
          hostname={ 'maps.googleapis.com'}
          pathname={ '/maps/api/js'}
          query={
            {
              v: '3.22',
              libraries: 'geometry,drawing,places'
            }
          }
          loadingElement={
            <div>
              <p className={ style['loading'] }>Loading ...</p>
            </div>
          }
          containerElement={
            <div />
          }
          googleMapElement={
            <GoogleMap
              defaultOptions={
                {
                  styles: mapStyle,
                  disableDefaultUI: true,
                  scrollwheel: false,
                  zoomControl: true
                }
              }
              onClick={ onClick }
              zoom={ zoom }
              center={ defaultCenter }
              disableDefaultUI={ true }
            >
              { this._renderMarkers(markers) }
            </GoogleMap>
          }
        />
      </div>

    );
  }
}

GoogleMaps.defaultProps = {
  className: PropTypes.string,
  zoom: PropTypes.number,
  markers: PropTypes.array,
  onClick: PropTypes.func,
  defaultCenter: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number
  })
};
