import React from "react";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import Feedback from "../pages/Feedback";
// import Feedback from "../pages/Feedback";

const INITIAL_STATE = {
    player: {
      name: '',
      gravatarEmail: '',
      score: 0,
      assertions: 0,
    },
};

describe('Teste de pagina de Feedback', () => {
    test('Teste se aparece os seguintes elementos na tela', () => {
        renderWithRouterAndRedux(<App/>, INITIAL_STATE,'/');
        const textSuavez = screen.getByText(/sua vez/i);
        expect(textSuavez).toBeInTheDocument();
    });
    test('Teste se a página contém button play again', () => {
        renderWithRouterAndRedux(<Feedback history={{push: () => {},}} />,INITIAL_STATE,'/feedback');
        const buttonPlayAgain = screen.getByRole('button', {  name: /play again/i})
        expect(buttonPlayAgain).toBeInTheDocument()
    });
    test('Teste se a página contém button ranking', () => {
        renderWithRouterAndRedux(<Feedback history={{push: () => {},}} />,INITIAL_STATE,'/feedback');
        const buttonRanking = screen.getByRole('button', {  name: /ranking/i})
        expect(buttonRanking).toBeInTheDocument()
    });
    test('Testa se banner aparece na tela', () => {
        renderWithRouterAndRedux(<App/>, INITIAL_STATE,'/');
        const banner = screen.getByRole('banner')
        expect(banner).toBeInTheDocument()
    });
    test('testa se feedback exibir uma mensagem relacionada ao desempenho da pessoa que jogou', () => {
        renderWithRouterAndRedux(<App />,INITIAL_STATE,'/feedback');
        // INITIAL_STATE.assertions = 3;
        const mensagem = screen.getByTestId('feedback-text');
        // const texto = screen.getByText(/well Done!/i);
        // expect(texto).toBeInTheDocument();
        expect(mensagem).toBeInTheDocument();
    });
    test('Se ao acertar menos de 3 questões aparece a mensagem Coud be Better', () => {
        const INITIAL_STATE = {
            player: {
                name: 'eee',
                gravatarEmail: 'eee@ddd.com',
                score: 90,
                assertions: 2,
            },
        }
        renderWithRouterAndRedux(<Feedback history={{push: () => {},}} />,INITIAL_STATE,'/feedback');
        const mensagem = screen.getByRole('heading', {  name: /could be better\.\.\./i})
        expect(mensagem.textContent).toContain('Could be better...');
        
    });
    test('Se ao acertar menos de 3 questões aparece a mensagem Well Done', () => {
        const INITIAL_STATE = {
            player: {
                name: 'eeee',
                gravatarEmail: 'eee@ddd.com',
                score: 90,
                assertions: 5,
            },
        }
        renderWithRouterAndRedux(<Feedback  history={{push: () => {},}} />,INITIAL_STATE,'/feedback');
        const mensagem = screen.getByRole('heading', {  name: /well done!/i})
        expect(mensagem.textContent).toContain('Well Done');
        
    });
    test('Teste de click nos Botão Play Again', async () => {
        const { history } = renderWithRouterAndRedux(<App />,INITIAL_STATE,'/feedback');
        const Bottton = screen.getByTestId('btn-play-again');
        userEvent.click(Bottton);
        await waitFor (() => expect(screen.getByText(/email/i)).toBeInTheDocument());
        const { pathname } = history.location;
        expect(pathname).toBe('/');
    });
    test('Teste de click nos Botão Ranking', async () => {
        const { history } = renderWithRouterAndRedux(<App />,INITIAL_STATE,'/feedback');
        const Bottton = screen.getByTestId('btn-ranking');
        userEvent.click(Bottton);
        await waitFor (() => expect(screen.getByText(/início/i)).toBeInTheDocument());
        const { pathname } = history.location;
        expect(pathname).toBe('/ranking');
    });
    
});