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
      values : {
        name: '',
        address: '',
        contact: '',
        position: {
          ltd: 0,
          lng: 0,
        }
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
    let { initialInstituteData} = this.state;
    let { instituteData } = nextProps;
    if (!initialInstituteData && instituteData.name) {
      this.setState({
        values: {
          name: instituteData.name,
          address: instituteData.address,
          contact: instituteData.contact,
          position : {
            lat: Number(instituteData.ltd),
            lng: Number(instituteData.lng)
          }
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
    console.log(event.latLng);
    let { values } = this.state;
    values.position = event.latLng;

    this.setState({
      values
    });
  }

  render() {
    let { values, errors, labels } = this.state;

    let markers = [
      {
        position: values.position,
        key: values.position.lng + values.position.lng || '',
        defaultAnimation: 2
      }
    ];

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
              defaultCenter={ values.position }
              zoom={ 12 }
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
