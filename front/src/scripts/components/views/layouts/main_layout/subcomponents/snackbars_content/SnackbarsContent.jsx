import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import * as Action from '../../../../../../actions/Actions';

import * as InformationMessageReducer from '../../../../../../reducers/information_message';
import {
  Snackbar
} from '../../../../../ui';

import style from './snackbars_content.scss';

class SnackbarsContent extends Component {
  _onHideInformationSnackbar() {
    this.props.dispatch(Action.cleanInformationMessage());
  }

  render() {
    let { informationMessageData } = this.props;

    return (
      <div className={ style['style'] }>
        <Snackbar
          action="Close"
          active={ informationMessageData.active }
          icon="info"
          label={ informationMessageData.message }
          timeout={ 2000 }
          onClick={ this._onHideInformationSnackbar.bind(this) }
          onTimeout={ this._onHideInformationSnackbar.bind(this) }
          type="accept"
        />
      </div>
    );
  }
}

SnackbarsContent.defaultProps = {
  informationMessageData: {
    active: false,
    message: ''
  }
};

SnackbarsContent.propTypes = {
  informationMessageData: PropTypes.shape({
    active: PropTypes.bool,
    message: PropTypes.string
  })
};

function select(state) {
  state = state.toJS();
  return {
    informationMessageData: InformationMessageReducer.getData(state)
  };
}

export default connect(select)(SnackbarsContent);
