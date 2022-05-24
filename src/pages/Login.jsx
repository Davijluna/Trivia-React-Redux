import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getQuestions } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      // buttonDisabled: true,
    };
  }

  componentDidMount() {
    if (localStorage.getItem('token')) {
      const { history } = this.props;
      history.push('/');
    }
  }

  // Atualiza o state com o valor do input
  changeInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  // Valida se os campos foram preenchidos
  checkInputs = () => {
    const { email, name } = this.state;
    if (email !== '' && name !== '') {
      return false;
    }
    return true;
  }

  handlePlay = async () => {
    const { dispatch, history } = this.props;
    const { email, name } = this.state;
    dispatch(await getQuestions());
    const data = { email, name };
    dispatch({
      type: 'GET_USER',
      payload: data,
    });
    history.push('/');
  }

  handleRedirect = () => {
    const { history } = this.props;
    history.push('/config');
  }

  render() {
    const { name, email } = this.state;
    return (
      <div>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            data-testid="input-gravatar-email"
            value={ email }
            name="email"
            id="email"
            onChange={ this.changeInput }
          />
        </label>

        <label htmlFor="name">
          Nome:
          <input
            type="text"
            data-testid="input-player-name"
            value={ name }
            name="name"
            id="name"
            onChange={ this.changeInput }
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          disabled={ this.checkInputs() }
          onClick={ this.handlePlay }
        >
          Play

        </button>

        <button
          data-testid="btn-settings"
          type="button"
          onClick={ this.handleRedirect }
        >
          Configurações
        </button>
      </div>
    );
  }
}

// const mapDispatchToProps = () => ({
//   dispatchChangeName: (dispatch) => {
//     dispatch(changeName());
//   },
// });

export default connect()(Login);

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};
