export const CHANGE_NAME = 'CHANGE_NAME';

const INITIAL_STATE = {
  player: {
    name: 'Player Name',
    gravatarEmail: 'player@email.com',
    score: 0,
    assertions: 0,
  },
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CHANGE_NAME:
    return { ...state, name: action.payload };
  default:
    return state;
  }
};

export default reducer;
