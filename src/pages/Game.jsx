import React, { Component } from 'react';
import PropTypes from 'prop-types';
<<<<<<< HEAD

export default class ScreenPlay extends Component {
  componentDidMount() {
    if (!localStorage.getItem('token')) {
      const { history } = this.props;
      history.push('/login');
    }
=======
import { connect } from 'react-redux';
import Header from '../components/Header';
import { getQuestions } from '../redux/actions';

class Game extends Component {
  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(await getQuestions());
>>>>>>> main-group-05
  }

  render() {
    return (
      <div>
<<<<<<< HEAD
        <div>ScreenPlay</div>
=======
        <Header />
        <div>Game</div>
>>>>>>> main-group-05
      </div>
    );
  }
}

<<<<<<< HEAD
ScreenPlay.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
=======
const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(Game);

Game.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  dispatch: PropTypes.func.isRequired,
>>>>>>> main-group-05
};
