export const CHANGE_NAME = 'CHANGE_NAME';

const INITIAL_STATE = {
  player: {
    name: '',
    gravatarEmail: '',
    score: 0,
    assertions: 0,
  },
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'GET_QUESTIONS':
    return { ...state, questions: action.payload };
  case 'SET_USER':
    return {
      ...state,
      player: { ...state.player, name: action.payload.name, email: action.payload.email },
    };
  default:
    return state;
  }
};

export default reducer;
