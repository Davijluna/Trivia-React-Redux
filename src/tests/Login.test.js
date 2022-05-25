import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

const INITIAL_STATE = {
  player: {
    name: '',
    gravatarEmail: '',
    score: 0,
    assertions: 0,
  },
};

describe('Testes da página de Login', () => {

  it('Se existe os elementos da página', () => {
    localStorage.clear();
    const { history, store } = renderWithRouterAndRedux(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');

    const btn_play = screen.getByTestId('btn-play');
    expect(btn_play).toBeInTheDocument();
    expect(btn_play).toBeDisabled();

    const email = screen.getByTestId('input-gravatar-email');
    expect(email).toBeInTheDocument();
    const name = screen.getByTestId('input-player-name');
    expect(name).toBeInTheDocument();

    const btn_Settings = screen.getByTestId('btn-settings');
    expect(btn_Settings).toBeInTheDocument();

    expect(store.getState()).toMatchObject(INITIAL_STATE);
  });

  it('testa o botão de configurações', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');

    const btn_Settings = screen.getByTestId('btn-settings');
    userEvent.click(btn_Settings);

    expect(screen.getByTestId('settings-title')).toBeInTheDocument();
  });

  it('testa a funcionalidade dos elementos e se o state funciona corretamente', async () => {
    const { history, store } = renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId('input-gravatar-email');
    const name = screen.getByTestId('input-player-name');
    const btn_play = screen.getByTestId('btn-play');

    const responseApi = { results: ['teste'], response_code: 0 };
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(responseApi),
    });

    const TESTE_STATE = {
      player: {
        name: 'teste teste',
        gravatarEmail: 'teste@teste.com',
        score: 0,
        assertions: 0,
      },
    };

    userEvent.type(name, 'teste teste');
    userEvent.type(email, 'teste@teste.com');
    expect(btn_play).not.toBeDisabled();
    localStorage.setItem('token', 'teste');
    userEvent.click(btn_play);

    expect(global.fetch).toBeCalledTimes(1);
    expect(global.fetch).toBeCalledWith(
      'https://opentdb.com/api.php?amount=5&token=teste'
    );

    await screen.findByText('Game');
    expect(store.getState()).toMatchObject(TESTE_STATE);

    const { pathname } = history.location;
    expect(pathname).toBe('/game');
  });
});
