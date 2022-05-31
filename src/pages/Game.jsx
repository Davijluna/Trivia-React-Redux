import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { getQuestions, addScore } from '../redux/actions';

let downloadTimer;

class Game extends Component {
  constructor() {
    super();
    this.state = {
      questionsLength: 0,
      currentQuestion: 0,
      control: false,
      position: -1,
      disableButtons: false,
      counter: 30,
    };
  }

  async componentDidMount() {
    const { dispatch, history } = this.props;
    dispatch(await getQuestions(history));
    this.counter();
    const { questions } = this.props;
    const number = this.randomNumber();
    this.setState({ questionsLength: questions.length, position: number });
  }

  counter = () => {
    const miliseconds = 1000;
    const time = { timeleft: 30 };
    downloadTimer = setInterval(() => {
      if (time.timeleft === 0) {
        clearInterval(downloadTimer);
        this.setState({ disableButtons: true });
      }
      this.setState({ counter: time.timeleft });
      time.timeleft -= 1;
    }, miliseconds);
    return downloadTimer;
  }

  handleClick = (testId, difficulty) => {
    const { dispatch } = this.props;
    // const timer = 15; // Alterar depois para o valor do timer reall
    const { counter } = this.state;
    this.setState({ control: true });

    const fixedNumber = 10;
    const easy = 1;
    const medium = 2;
    const hard = 3;

    if (testId.includes('correct')) { // Caso selecione a resposta correta entra no SWITCH abaixo
      switch (difficulty) {
      case 'easy':
        dispatch(addScore(fixedNumber + (counter * easy)));
        break;
      case 'medium':
        dispatch(addScore(fixedNumber + (counter * medium)));
        break;
      case 'hard':
        dispatch(addScore(fixedNumber + (counter * hard)));
        break;
      default:
        return null;
      }
    }
  };

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

  randomAlternativas = (incorretas, certa, difficulty) => {
    const { position, disableButtons } = this.state;

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
          onClick={ () => this.handleClick(item.testId, difficulty) }
          className={ classNameItem }
          disabled={ disableButtons }
        >
          { item.alternativa }
        </button>
      );
    });
  };

  handleNext = () => {
    clearInterval(downloadTimer);
    this.setState((prev) => {
      let nextCurrent;
      if (prev.currentQuestion < prev.questionsLength - 1) {
        nextCurrent = prev.currentQuestion + 1;
      }
      return ({
        control: false,
        position: -1,
        currentQuestion: nextCurrent,
      });
    });
  };

  goToFeedback = () => {
    const { history } = this.props;
    history.push('/feedback');
  }

  render() {
    const { questions } = this.props;
    const { questionsLength, currentQuestion, control, counter } = this.state;
    const lastQuestion = 4;
    return (
      <div>
        <Header />
        <div>Game</div>
        <div>
          { questionsLength > 0
          && (
            <>
              <h2 data-testid="counter">{ counter }</h2>
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
                  questions[currentQuestion].difficulty,
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
                onClick={ currentQuestion === lastQuestion
                  ? this.goToFeedback : this.handleNext }
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
