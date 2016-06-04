import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as Actions from 'actions/Actions';
import * as instituteReducer from 'reducers/institute';
import {
  GoogleMaps
} from 'lib/google_maps';

import {
  Grid,
  GridItem
} from 'lib/grid';

import {
  CardWithHeader,
} from 'lib/ui';

import style from './contact.scss';

class SmartContact extends Component {

  componentDidMount() {
    this.props.dispatch(Actions.getInstituteData());
  }

  render() {
    let { instituteData } = this.props;
    let instituteLocalization = {
      lat: Number(instituteData.ltd) || 0,
      lng: Number(instituteData.lng) || 0
    };

    let markers = [
      {
        position: instituteLocalization,
        key: instituteData.name || '',
      }
    ];
    console.log(instituteLocalization);
    console.log(this.props.instituteData);
    return (
      <Grid center>
        <GridItem xsSize="8">
          <CardWithHeader
            title="Contact"
            subtitle="Description our institute"
          >
            <GoogleMaps
              className={ style['map']}
              defaultCenter={ instituteLocalization }
              zoom={ 12 }
              markers={ markers }
            />
            <div className={ style['contact-data'] }>
              <p>{ instituteData.name }</p>
              <p>{ instituteData.address }</p>
              <p>{ instituteData.contact }</p>
            </div>
          </CardWithHeader>
        </GridItem>
      </Grid>
    );
  }
}

SmartContact.propTypes = {
  instituteData: PropTypes.array
};

SmartContact.defaultProps = {
  instituteData: {
    ltd: 0,
    lng: 0,
    name: ''
  }
};

function select(state) {
  state = state.toJS();
  return {
    instituteData: instituteReducer.getInstituteData(state)
  };
}

export default connect(select)(SmartContact);
