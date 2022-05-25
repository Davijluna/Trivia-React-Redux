import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ScreenPlay extends Component {
  componentDidMount() {
    if (!localStorage.getItem('token')) {
      const { history } = this.props;
      history.push('/login');
    }
  }

  render() {
    return (
      <div>
        <div>ScreenPlay</div>
      </div>
    );
  }
}

ScreenPlay.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};
