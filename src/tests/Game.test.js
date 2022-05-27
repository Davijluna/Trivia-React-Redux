import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import React from 'react';
import App from '../App';
import { questionsResponse } from '../../cypress/mocks/questions';

const INITIAL_STATE = {
  player: {
    name: '',
    gravatarEmail: '',
    score: 0,
    assertions: 0,
  },
  questions: questionsResponse.results,
};

describe('Testes da página de jogo', () => {
  test('inicio', async () => {
    const { history, store, debug } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');
    const { pathname } = history.location;
    expect(pathname).toBe('/game');

  });
  test('Se os elementos estao sendo exibidos na tela', async () => {

    const { history, store, debug } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');

    await waitFor(() => expect(screen.getByTestId('question-category')).toBeInTheDocument() , {timeout: 3000}); //wrong-answer-
    expect(screen.getByTestId('question-text')).toBeInTheDocument();

    let btnWrong = screen.getByTestId('wrong-answer-0');
    expect(btnWrong).toBeInTheDocument();
    userEvent.click(btnWrong);        
    userEvent.click(screen.getByTestId('btn-next'));

    btnWrong = screen.getByTestId('wrong-answer-0');
    userEvent.click(btnWrong);
    userEvent.click(screen.getByTestId('btn-next'));
    btnWrong = screen.getByTestId('wrong-answer-0');
    userEvent.click(btnWrong);
    userEvent.click(screen.getByTestId('btn-next'));
    btnWrong = screen.getByTestId('wrong-answer-0');
    userEvent.click(btnWrong);
    userEvent.click(screen.getByTestId('btn-next'));
    btnWrong = screen.getByTestId('wrong-answer-0');
    userEvent.click(btnWrong);
    userEvent.click(screen.getByTestId('btn-next'));

    
    const { pathname } = history.location;
    expect(pathname).toBe('/feedback');



    
  }) 
})