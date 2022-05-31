import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import React from 'react';
import App from '../App';
import { questionsResponse } from '../../cypress/mocks/questions';
const test = require('../pages/Game');

const INITIAL_STATE = {
  player: {
    name: '',
    gravatarEmail: '',
    score: 0,
    assertions: 0,
  },
  questions: questionsResponse.results,
};

const responseAPI = {
  "response_code":0,
  "response_message":"Token Generated Successfully!",
  "token":"f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
}

const result = {
  results: [
      {
        category: 'Entertainment: Video Games',
        type: 'boolean',
        difficulty: 'medium',
        question: 'Nintendo started out as a playing card manufacturer.',
        correct_answer: 'True',
        incorrect_answers: [
          'False'
        ]
      },
      {
        category: 'Geography',
        type: 'multiple',
        difficulty: 'easy',
        question: 'Which country does Austria not border?',
        correct_answer: 'France',
        incorrect_answers: [
          'Slovenia',
          'Switzerland',
          'Slovakia'
        ]
      },
      {
        category: 'Entertainment: Video Games',
        type: 'multiple',
        difficulty: 'medium',
        question: 'How many normal endings are there in Cry Of Fear&#039;s campaign mode?',
        correct_answer: '4',
        incorrect_answers: [
          '5',
          '3',
          '6'
        ]
      },
      {
        category: 'Celebrities',
        type: 'multiple',
        difficulty: 'medium',
        question: 'Which TV chef wrote an autobiography titled &quot;Humble Pie&quot;?',
        correct_answer: 'Gordon Ramsay',
        incorrect_answers: [
          'Jamie Oliver',
          'Ainsley Harriott',
          'Antony Worrall Thompson'
        ]
      },
      {
        category: 'General Knowledge',
        type: 'multiple',
        difficulty: 'hard',
        question: 'The word &quot;abulia&quot; means which of the following?',
        correct_answer: 'The inability to make decisions',
        incorrect_answers: [
          'The inability to stand up',
          'The inability to concentrate on anything',
          'A feverish desire to rip one&#039;s clothes off'
        ]
      }
    ]
};

const resultWrong = {
  results: [
      {
        category: 'Entertainment: Video Games',
        type: 'boolean',
        difficulty: 'mediumqwer',
        question: 'Nintendo started out as a playing card manufacturer.',
        correct_answer: 'True',
        incorrect_answers: [
          'False'
        ]
      },
      {
        category: 'Geography',
        type: 'multiple',
        difficulty: 'easy',
        question: 'Which country does Austria not border?',
        correct_answer: 'France',
        incorrect_answers: [
          'Slovenia',
          'Switzerland',
          'Slovakia'
        ]
      },
      {
        category: 'Entertainment: Video Games',
        type: 'multiple',
        difficulty: 'medium',
        question: 'How many normal endings are there in Cry Of Fear&#039;s campaign mode?',
        correct_answer: '4',
        incorrect_answers: [
          '5',
          '3',
          '6'
        ]
      },
      {
        category: 'Celebrities',
        type: 'multiple',
        difficulty: 'medium',
        question: 'Which TV chef wrote an autobiography titled &quot;Humble Pie&quot;?',
        correct_answer: 'Gordon Ramsay',
        incorrect_answers: [
          'Jamie Oliver',
          'Ainsley Harriott',
          'Antony Worrall Thompson'
        ]
      },
      {
        category: 'General Knowledge',
        type: 'multiple',
        difficulty: 'hard',
        question: 'The word &quot;abulia&quot; means which of the following?',
        correct_answer: 'The inability to make decisions',
        incorrect_answers: [
          'The inability to stand up',
          'The inability to concentrate on anything',
          'A feverish desire to rip one&#039;s clothes off'
        ]
      }
    ]
};

describe('Testes da página de jogo', () => {
  it('Testa se a página do game está no local /game', async () => {
    const { history, debug } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');
    const { pathname } = history.location;
    expect(pathname).toBe('/game');
  });

  it('Testa se quando o jogo acaba é o usuário é redirecionado para a tela de Feedback', async () => {

    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');

    await waitFor(() => expect(screen.getByTestId('question-category')).toBeInTheDocument())
    const questionCategory = await screen.findByTestId('question-category');
    expect(questionCategory).toBeInTheDocument();
    expect(screen.getByTestId('question-text')).toBeInTheDocument();
    expect(screen.getByTestId('counter')).toBeInTheDocument();

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
  });

  it('Verifica timer', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(responseAPI)
    }));
    
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(result)
    }));

    jest.useFakeTimers();
    const teste = jest.spyOn(global, 'setTimeout');
    
    renderWithRouterAndRedux(<App/>)

    const email = screen.getByTestId('input-gravatar-email');
    expect(email).toBeInTheDocument();

    const nome = screen.getByTestId('input-player-name');
    expect(nome).toBeInTheDocument();

    userEvent.type(nome, 'lucas');
    userEvent.type(email, 'lucas@lucas.com');

    const btnPlay = screen.getByRole('button', { name: /Play/i });
    expect(btnPlay).toBeInTheDocument();
    userEvent.click(btnPlay);

    const timer = await screen.findByTestId('counter');
    expect(timer).toHaveTextContent(30);

    expect(teste).toHaveBeenCalled();

    const button = await screen.findByTestId('correct-answer');
    expect(button).not.toBeDisabled();

    //Função pega na documentação
    //Link: https://jestjs.io/docs/timer-mocks

    jest.advanceTimersByTime(40000);

    expect(button).toBeDisabled();
  });

  it('Verifica score', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(responseAPI)
    }));
    
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(result)
    }));
  
    renderWithRouterAndRedux(<App/>)

    const email = screen.getByTestId('input-gravatar-email');
    expect(email).toBeInTheDocument();

    const nome = screen.getByTestId('input-player-name');
    expect(nome).toBeInTheDocument();

    userEvent.type(nome, 'lucas');
    userEvent.type(email, 'lucas@lucas.com');

    const btnPlay = screen.getByRole('button', { name: /Play/i });
    expect(btnPlay).toBeInTheDocument();
    userEvent.click(btnPlay);

    let correct = await screen.findByTestId('correct-answer');
    userEvent.click(correct);
    expect(screen.getByTestId('header-score')).toHaveTextContent('70');
    userEvent.click(screen.getByTestId('btn-next'));

    correct = screen.getByTestId('correct-answer');
    userEvent.click(correct);
    expect(screen.getByTestId('header-score')).toHaveTextContent('110');
    userEvent.click(screen.getByTestId('btn-next'));

    correct = screen.getByTestId('correct-answer');
    userEvent.click(correct);
    expect(screen.getByTestId('header-score')).toHaveTextContent('180');
    userEvent.click(screen.getByTestId('btn-next'));

    correct = screen.getByTestId('correct-answer');
    userEvent.click(correct);
    expect(screen.getByTestId('header-score')).toHaveTextContent('250');
    userEvent.click(screen.getByTestId('btn-next'));

    correct = screen.getByTestId('correct-answer');
    userEvent.click(correct);
    expect(screen.getByTestId('header-score')).toHaveTextContent('350');
  });

  it('Se a dificuldade não for uma das opções retorna null', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(responseAPI)
    }));
    
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(resultWrong)
    }));
  
    renderWithRouterAndRedux(<App/>)

    const email = screen.getByTestId('input-gravatar-email');
    expect(email).toBeInTheDocument();

    const nome = screen.getByTestId('input-player-name');
    expect(nome).toBeInTheDocument();

    userEvent.type(nome, 'lucas');
    userEvent.type(email, 'lucas@lucas.com');

    const btnPlay = screen.getByRole('button', { name: /Play/i });
    expect(btnPlay).toBeInTheDocument();
    userEvent.click(btnPlay);

    const correct_answer = await screen.findByTestId('correct-answer');
    userEvent.click(correct_answer);
    expect(screen.getByTestId('header-score')).toHaveTextContent('0');
  });
});