import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

export default class Game extends Component {
  componentDidMount() {
    if (!localStorage.getItem('token')) {
      const { history } = this.props;
      history.push('/login');
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div>Game</div>
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};
