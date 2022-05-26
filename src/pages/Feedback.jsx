import React from 'react';
import { connect } from 'react-redux';

class Feedback extends React.Component {
  render() {
    return (
      <div>
        <h1 data-testid="feedback-text">Feedback</h1>
      </div>
    );
  }
}

export default connect()(Feedback);
