import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import React from 'react';
import App from '../App';
import fetchMock from 'fetch-mock-jest';

describe('Testes da página de jogo', () => {
  test('Se os elementos estao sendo exibidos na tela', async () => {

    const { history, store, debug } = renderWithRouterAndRedux(<App />);
    history.push('/game');
    global.fetch = (url) => {
      return Promise.resolve({
        json: () => Promise.resolve(
          ([
            {
              "category": "Science: Computers",
              "type": "boolean",
              "difficulty": "medium",
              "question": "The common software-programming acronym &quot;I18N&quot; comes from the term &quot;Interlocalization&quot;.",
              "correct_answer": "False",
              "incorrect_answers": [
                "True"
              ]
            }
          ])
        )
      })
    }

    debug();
    const question = await screen.findByText(/The common/i);
    expect(question).toBeInTheDocument();

  }) 
})