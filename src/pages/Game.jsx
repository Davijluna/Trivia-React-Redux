import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { getQuestions } from '../redux/actions';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      questionsLength: 0,
      currentQuestion: 0,
      color: '',
      correctAnswer: '',
    };
  }

  async componentDidMount() {
    const { dispatch, history } = this.props;
    dispatch(await getQuestions(history));
    const { questions } = this.props;
    this.setState({ questionsLength: questions.length });
  }

  handleClick = ({ target }, testId) => {
    console.log(testId);
    // if (testId.includes('wrong')) {
    //   this.setState({ color: '' });
    //   target.className = 'wrongAnswer';
    // } else {
    //   this.setState({ color: 'wrongAnswer' });
    //   target.className = 'correctAnswer';
    // }
  };

  // changeBorder = (classItem) => classItem;

  randomAlternativas = (incorretas, certa) => {
    const { color } = this.state;

    const response = incorretas.map((alternativa, index) => (
      {
        alternativa,
        testId: `wrong-answer-${index}`,
      }
    ));
    const MAX_LENGTH = 4;
    const number = Math.floor(Math.random() * MAX_LENGTH);
    response.splice(number, 0, certa);
    return response.map((item) => (
      <button
        key={ item.testId }
        data-testId={ item.testId }
        type="button"
        onClick={ (e) => this.handleClick(e, item.testId) }
        // className={ color }
      >
        { item.alternativa }
      </button>
    ));
  }

  render() {
    const { questions } = this.props;
    const { questionsLength, currentQuestion } = this.state;

    return (
      <div>
        <Header />
        <div>Game</div>
        <div>
          { questionsLength > 0
          && (
            <>
              <div>
                <p
                  data-testid="question-category"
                >
                  { questions[currentQuestion].category }
                </p>
                <p data-testid="question-text">{ questions[currentQuestion].question }</p>
              </div>
              <div data-testid="answer-options">
                { this.randomAlternativas(
                  questions[currentQuestion].incorrect_answers,
                  { alternativa: questions[currentQuestion].correct_answer,
                    testId: 'correct-answer',
                  },
                ) }
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
  questions: state.questions,
});

export default connect(mapStateToProps)(Game);

Game.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  dispatch: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
};
