import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Ranking extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <h1 data-testid="ranking-title">Feedback</h1>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default connect()(Ranking);
