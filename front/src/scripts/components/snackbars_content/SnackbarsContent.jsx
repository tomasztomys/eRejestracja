import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as Action from '../../actions/Actions';

import * as InformationMessageReducer from '../../reducers/information_message';
import * as ErrorMessageReducer from '../../reducers/error_message';

import {
  Snackbar
} from '../ui';

import style from './snackbars_content.scss';

class SnackbarsContent extends Component {
  _onHideInformationSnackbar() {
    this.props.dispatch(Action.cleanInformationMessage());
  }

  _onHideErrorSnackbar() {
    this.props.dispatch(Action.cleanWarningMessage());
  }

  render() {
    let { informationMessageData, errorMessageData } = this.props;

    return (
      <div className={ style['style'] }>
        <Snackbar
          action="Close"
          active={ informationMessageData.active }
          icon="info"
          label={ informationMessageData.message }
          timeout={ 3000 }
          onClick={ this._onHideInformationSnackbar.bind(this) }
          onTimeout={ this._onHideInformationSnackbar.bind(this) }
          type="cancel"
        />
        <Snackbar
          action="Close"
          active={ errorMessageData.active }
          icon="error"
          label={ errorMessageData.message }
          timeout={ 3000 }
          onClick={ this._onHideErrorSnackbar.bind(this) }
          onTimeout={ this._onHideErrorSnackbar.bind(this) }
          type="cancel"
        />
      </div>
    );
  }
}

SnackbarsContent.defaultProps = {
  informationMessageData: {
    active: false,
    message: ''
  },
  errorMessageData: {
    active: false,
    message: ''
  }
};

SnackbarsContent.propTypes = {
  informationMessageData: PropTypes.shape({
    active: PropTypes.bool,
    message: PropTypes.string
  }),
  errorMessageData: PropTypes.shape({
    active: PropTypes.bool,
    message: PropTypes.string
  })
};

function select(state) {
  state = state.toJS();
  return {
    informationMessageData: InformationMessageReducer.getData(state),
    errorMessageData: ErrorMessageReducer.getData(state)
  };
}

export default connect(select)(SnackbarsContent);
