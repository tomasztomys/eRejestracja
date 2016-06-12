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
      values: {
        name: '',
        address: '',
        contact: ''
      },
      validations: {
        name: true,
        address: true,
        contact: true,
      },
      errors: {
        name: '',
        address: '',
        contact: '',
      },
      errorsMessages: {
        name: 'Please fill name of institute.',
        address: 'Please fill address of institute.',
        contact: 'Please fill phone number correct.'
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

  onBlur(type) {
    let { validations, values } = this.state;

    switch(type) {
      case 'name':
      case 'address': {
        validations[type] = values[type].length > 0;
        break;
      }
      case 'contact': {
        validations[type] = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g.test(values[type]) && values[type].length >= 9;
        break;
      }
    }

    this.setState({
      validations
    });
  }

  handleMapClick(event) {
    let marker = {
      position: {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      },
      key: Date.now(),
      defaultAnimation: 2
    };

    this.setState({
      markers: [ marker ]
    });
  }

  checkValidations() {
    let { validations } = this.state;
    let validation = true;

    for (let key in validations) {
      if (validation && !validations[key]) {
        validation = false;
      }
    }

    return validation;
  }

  onSave() {
    if (this.checkValidations()) {
      let { values, markers } = this.state;

      let parameters = {
        name: values.name,
        address: values.address,
        contact: values.contact,
        ltd: markers[0].position.lat,
        lng: markers[0].position.lng
      };

      this.props.dispatch(Actions.changeInstituteData(parameters));
    }
  }

  render() {
    let { values, validations, errorsMessages, labels, defaultPosition, markers } = this.state;
    let actions = [
      {
        label: 'Save',
        onClick: this.onSave.bind(this),
        className: style['save-button']
      }
    ];

    return (
      <Grid center>
        <GridItem
          xsSize="11"
          smSize="9"
          mdSize="7"
          lgSize="6"
        >
          <CardWithHeader
            title="Contact edition"
            subtitle="Description our institute"
            actions={ actions }
          >
            <Input
              key={ labels.name }
              label={ labels.name }
              error={ validations.name ? '' : errorsMessages.name }
              value={ values.name }
              onChange={ this.onChange.bind(this, 'name') }
              onBlur={ this.onBlur.bind(this, 'name') }
            />
            <Input
              key={ labels.address }
              label={ labels.address }
              error={ validations.address ? '' : errorsMessages.address }
              value={ values.address }
              onChange={ this.onChange.bind(this, 'address') }
              onBlur={ this.onBlur.bind(this, 'address') }
            />
            <Input
              key={ labels.contact }
              label={ labels.contact }
              error={ validations.contact ? '' : errorsMessages.contact }
              value={ values.contact }
              onChange={ this.onChange.bind(this, 'contact') }
              onBlur={ this.onBlur.bind(this, 'contact') }
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
