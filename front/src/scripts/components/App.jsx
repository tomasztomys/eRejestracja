import React, { PropTypes } from 'react';
import { SnackbarsContent } from './snackbars_content';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <SnackbarsContent />
        { this.props.children }
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node
};