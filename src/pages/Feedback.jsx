import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Feedback extends Component {
  render() {
    const { assertions, score } = this.props;
    const CONDITION_MESSAGE = 3;
    return (
      <div>
        <h2 data-testid="feedback-text">
          { assertions < CONDITION_MESSAGE ? 'Could be better...' : 'Well Done!' }
        </h2>

        <h2 data-test-id="feedback-total-score">
          Score:
          { score }
        </h2>
        <h2 data-test-id="feedback-total-question">
          Correct Aswers:
          { assertions }
        </h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};
