import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Hearder from '../components/Header';
import { actionRestart } from '../redux/actions';

class Feedback extends React.Component {
  async componentDidMount() {
    const { name, score, url } = this.props;
    const userData = {
      name,
      score,
      picture: url,
    };

    if (localStorage.getItem('ranking') && localStorage.getItem('ranking') !== '') {
      const oldRanking = [...await JSON.parse(localStorage.getItem('ranking')), userData];
      const arrSemRepetido = oldRanking.filter((player) => player.name !== name);
      const playerRepetido = oldRanking.find((player) => player.name === name);
      playerRepetido.score = score;
      playerRepetido.name = name;
      arrSemRepetido.push(playerRepetido);
      console.log(arrSemRepetido);
      // const sortRanking = arrSemRepetido.sort((a, b) => b.score - a.score);
      localStorage.setItem('ranking', JSON.stringify(arrSemRepetido));
    } else {
      localStorage.setItem('ranking', JSON.stringify([userData]));
    }
  }

  FeedbackMessage = () => {
    const { assertions } = this.props;
    const condition = 3;
    if (assertions < condition) {
      return 'Could be better...';
    }
    return 'Well Done!';
  }

  handlePlayAgain = () => {
    const { history, dispatch } = this.props;
    dispatch(actionRestart());
    history.push('/');
  };

  handleRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { score, assertions } = this.props;
    return (

      <div>
        <Hearder />
        <h2 data-testid="feedback-text">{ this.FeedbackMessage() }</h2>

        <div>
          Pontuação:
          <span data-testid="feedback-total-score">{ score }</span>
        </div>
        <div>
          <span data-testid="feedback-total-question">{ assertions }</span>
        </div>
        <button
          data-testid="btn-play-again"
          onClick={ this.handlePlayAgain }
          type="button"
        >
          Play Again
        </button>
        <button
          data-testid="btn-ranking"
          onClick={ this.handleRanking }
          type="button"
        >
          Ranking
        </button>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  name: state.player.name,
  assertions: state.player.assertions,
  url: state.player.url,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  url: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,

};

export default connect(mapStateToProps)(Feedback);
