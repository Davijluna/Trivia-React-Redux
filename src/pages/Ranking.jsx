import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Ranking extends React.Component {
  constructor() {
    super();
    this.state = {
      rankingList: JSON.parse(localStorage.getItem('ranking'))
        .sort((a, b) => b.score - a.score),
    };
  }

  goToHome = () => {
    const { history, dispatch } = this.props;
    dispatch({
      type: 'RESET_INFO',
    });
    history.push('/');
  }

  render() {
    const { rankingList } = this.state;
    return (
      <div>
        <div>
          <h1 data-testid="ranking-title">Feedback</h1>
          <button
            data-testid="btn-go-home"
            type="button"
            onClick={ this.goToHome }
          >
            Início
          </button>
        </div>
        <div>
          { rankingList.map(({ name, score, picture }, index) => (
            <div key={ index }>
              <img src={ picture } alt={ name } />
              <p data-testid={ `player-name-${index}` }>{ name }</p>
              <p data-testid={ `player-score-${index}` }>{ score }</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Ranking);
