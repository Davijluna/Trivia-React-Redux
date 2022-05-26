import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Ranking extends React.Component {
  goToHome = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <div>
        <Header />
        <h1 data-testid="ranking-title">Feedback</h1>
        <button
          data-testid="btn-go-home"
          type="button"
          onClick={ this.goToHome }
        >
          Início

        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default connect()(Ranking);
