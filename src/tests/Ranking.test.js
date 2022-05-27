import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Ranking from '../pages/Ranking';
import App from '../App';

const INITIAL_STATE = {
  player: {
    name: 'Test',
    gravatarEmail: 'test@test.com',
    score: 69,
    assertions: 3,
  },
};

const mockRanking = [{
  name: "Lucas da Cunha Moreti",
  picture: "https://www.gravatar.com/avatar/4675ee57486c6ab9507d64d763ffd4f3",
  score: 215,
}];

describe('Testes da página de Ranking', () => {

  it('Se existe o botão de início', () => {
    const json = JSON.stringify(mockRanking)
    localStorage.setItem('ranking', json);
    const { history } = renderWithRouterAndRedux(<Ranking />, INITIAL_STATE, '/ranking');
    
    const { pathname } = history.location;
    expect(pathname).toBe('/ranking');

    const buttonHome = screen.getByRole('button', { name: /Início/i } );
    expect(buttonHome).toBeInTheDocument();
  });

  it('Se ao clicar no botão início é direcionado para a página de login', () => {
    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/ranking');

    const buttonHome2 = screen.getByTestId("btn-go-home");
    userEvent.click(buttonHome2);
    
    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

});
