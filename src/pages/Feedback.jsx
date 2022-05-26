import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Hearder from '../components/Header';

class Feedback extends React.Component {
  FeedbackMessage = () => {
    const { assertions } = this.props;
    const condition = 3;
    if (assertions < condition) {
      return 'Could be better...';
    }
    return 'Well Done!';
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
};

export default connect(mapStateToProps)(Feedback);
