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
      control: false,
      position: -1,
    };
  }

  async componentDidMount() {
    const { dispatch, history } = this.props;
    dispatch(await getQuestions(history));
    const { questions } = this.props;
    const number = this.randomNumber();
    this.setState({ questionsLength: questions.length, position: number });
  }

  handleClick = () => {
    this.setState({ control: true });
  };

  // changeBorder = (classItem) => classItem;

  randomNumber = () => {
    const { position } = this.state;
    const POSITION_STARTER = -1;
    if (position === POSITION_STARTER) {
      const MAX_LENGTH = 4;
      const number = Math.floor(Math.random() * MAX_LENGTH);
      return number;
    }
    return position;
  };

  handleClassName = (testId) => {
    const { control } = this.state;
    const correctAnswer = 'correctAnswer';
    const wrongAnswer = 'wrongAnswer';

    if (!control) return 'choiceBtn';
    if (testId.includes('wrong')) return wrongAnswer;
    return correctAnswer;
  };

  randomAlternativas = (incorretas, certa) => {
    const { position } = this.state;

    const response = incorretas.map((alternativa, index) => (
      {
        alternativa,
        testId: `wrong-answer-${index}`,
      }
    ));

    response.splice(position, 0, certa);
    return response.map((item) => {
      const classNameItem = this.handleClassName(item.testId);
      return (
        <button
          key={ item.testId }
          data-testid={ item.testId }
          type="button"
          onClick={ this.handleClick }
          className={ classNameItem }
        >
          { item.alternativa }
        </button>
      );
    });
  }

  handleNext = () => {
    this.setState((prev) => {
      let nextCurrent;
      if (prev.currentQuestion < prev.questionsLength - 1) {
        nextCurrent = prev.currentQuestion + 1;
      } else {
        nextCurrent = 0;
      }
      return ({
        control: false,
        position: -1,
        currentQuestion: nextCurrent,
      });
    });
  };

  render() {
    const { questions } = this.props;
    const { questionsLength, currentQuestion, control } = this.state;
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
        <div>
          {
            control
            && (
              <button
                data-testid="btn-next"
                onClick={ this.handleNext }
                type="button"
              >
                Next
              </button>
            )
          }
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
