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
  case 'RESTART':
    return { ...state,
      player: { ...state.player,
        score: 0,
        assertions: 0 }};
  case 'GET_USER':
    return { ...state,
      player: { ...state.player,
        name: action.payload.name,
        gravatarEmail: action.payload.email } };
  case 'ADD_SCORE':
    return { ...state,
      player: { ...state.player,
        score: state.player.score + action.payload,
        assertions: state.player.assertions + 1 } };
  case 'SET_URL_PROFILE':
    return { ...state,
      player: { ...state.player,
        url: action.payload,
      } };
  default:
    return state;
  }
};

export default reducer;
