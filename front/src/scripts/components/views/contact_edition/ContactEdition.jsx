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
  Input
} from 'lib/ui';

import style from './contact_edition.scss';

class ContactEdition extends Component {

  constructor() {
    super();
    this.state = {
      initialInstituteData: false,
      defaultPosition: {
        ltd: 0,
        lng: 0
      },
      markers: [],
      values : {
        name: '',
        address: '',
        contact: ''
      },
      errors: {
        name: '',
        address: '',
        contact: '',
      },
      labels: {
        name: 'Institude name',
        address: 'Address',
        contact: 'Contact phone',
      }
    };
  }

  componentDidMount() {
    this.props.dispatch(Actions.getInstituteData());
  }

  componentWillReceiveProps(nextProps) {
    let { initialInstituteData, defaultPosition } = this.state;
    let { instituteData } = nextProps;
    if (!initialInstituteData && instituteData.name) {
      this.setState({
        defaultPosition: {
          lat: Number(instituteData.ltd),
          lng: Number(instituteData.lng)
        },
        markers: [
          {
            position : {
              lat: Number(instituteData.ltd),
              lng: Number(instituteData.lng)
            },
            key: instituteData.name,
            defaultAnimation: 2
          },
        ],
        values: {
          name: instituteData.name,
          address: instituteData.address,
          contact: instituteData.contact,
        },
        initialInstituteData: true
      });
    }
  }
  onChange(type, value) {
    let { values } = this.state;

    values[type] = value;
    this.setState({
      values
    });
  }

  handleMapClick(event) {
    let marker = {
      position: event.latLng,
      key: Date.now(),
      defaultAnimation: 2
    }
    this.setState({
      markers: [ marker ]
    });
  }

  render() {
    let { values, errors, labels, defaultPosition, markers } = this.state;

    return (
      <Grid center>
        <GridItem xsSize="8">
          <CardWithHeader
            title="Contact edition"
            subtitle="Description our institute"
          >
          <Input
            key={ labels.name }
            label={ labels.name }
            error={ errors.name }
            value={ values.name }
            onChange={ this.onChange.bind(this, 'name') }
           />
           <Input
              key={ labels.address }
              label={ labels.address }
              error={ errors.address }
              value={ values.address }
              onChange={ this.onChange.bind(this, 'address') }
            />
            <Input
              key={ labels.contact }
              label={ labels.contact }
              error={ errors.contact }
              value={ values.contact }
              onChange={ this.onChange.bind(this, 'contact') }
            />
            <GoogleMaps
              className={ style['map'] }
              defaultCenter={ defaultPosition }
              defaultZoom={ 12 }
              markers={ markers }
              onClick={ this.handleMapClick.bind(this) }
            />
          </CardWithHeader>
        </GridItem>
      </Grid>
    );
  }
}

ContactEdition.propTypes = {
  instituteData: PropTypes.object
};

function select(state) {
  state = state.toJS();
  return {
    instituteData: instituteReducer.getInstituteData(state)
  };
}

export default connect(select)(ContactEdition);
