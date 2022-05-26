import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Hearder from '../components/Header';

class Feedback extends React.Component {
  FeedbackMessage = () => {
    const { assertions } = this.props;
    const condition = 3;
    if (assertions < condition) {
      return 'Could be better...';
    }
    return 'Well Done!';
  }

  handlePlayAgain = () => {
    const { history } = this.props;
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
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
