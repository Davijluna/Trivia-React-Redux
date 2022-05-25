import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Game extends Component {
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

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(Game);

Game.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};
