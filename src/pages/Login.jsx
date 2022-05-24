import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      // buttonDisabled: true,
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
        >
          Play

        </button>
      </div>
    );
  }
}

export default Login;
