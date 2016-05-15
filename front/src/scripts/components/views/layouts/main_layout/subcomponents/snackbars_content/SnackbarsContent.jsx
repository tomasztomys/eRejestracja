import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as Action from '../../../../../../actions/Actions';

import * as InformationMessageReducer from '../../../../../../reducers/information_message';
import * as WarningMessageReducer from '../../../../../../reducers/warning_message';

import {
  Snackbar
} from '../../../../../ui';

import style from './snackbars_content.scss';

class SnackbarsContent extends Component {
  _onHideInformationSnackbar() {
    this.props.dispatch(Action.cleanInformationMessage());
  }

  _onHideWarningSnackbar() {
    this.props.dispatch(Action.cleanWarningMessage());
  }

  render() {
    let { informationMessageData, warningMessageData } = this.props;

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
          active={ warningMessageData.active }
          icon="warning"
          label={ warningMessageData.message }
          timeout={ 3000 }
          onClick={ this._onHideWarningSnackbar.bind(this) }
          onTimeout={ this._onHideWarningSnackbar.bind(this) }
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
  warningMessageData: {
    active: false,
    message: ''
  }
};

SnackbarsContent.propTypes = {
  informationMessageData: PropTypes.shape({
    active: PropTypes.bool,
    message: PropTypes.string
  }),
  warningMessageData: PropTypes.shape({
    active: PropTypes.bool,
    message: PropTypes.string
  })
};

function select(state) {
  state = state.toJS();
  return {
    informationMessageData: InformationMessageReducer.getData(state),
    warningMessageData: WarningMessageReducer.getData(state)
  };
}

export default connect(select)(SnackbarsContent);
