import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
    };
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
    const data = { email, name };
    dispatch({
      type: 'GET_USER',
      payload: data,
    });
    history.push('/game');
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
          onClick={ this.handleRedirect }
          data-testid="btn-settings"
          type="button"
        >
          Configurações
        </button>
      </div>
    );
  }
}

export default connect()(Login);

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};
